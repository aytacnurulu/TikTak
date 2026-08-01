// src/shared/lib/telegram.ts
const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
const ENV = import.meta.env.MODE;

interface TelegramErrorPayload {
  message: string;
  stack?: string;
  componentStack?: string | null;
  url: string;
}

const recentErrors = new Map<string, number>();
const DEDUPE_WINDOW_MS = 60_000;

function shouldSend(key: string): boolean {
  const now = Date.now();
  const last = recentErrors.get(key);
  if (last && now - last < DEDUPE_WINDOW_MS) return false;
  recentErrors.set(key, now);
  return true;
}

// Telegram MarkdownV2 üçün xüsusi simvolları escape edir
function escapeMd(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

export async function notifyTelegramError(payload: TelegramErrorPayload) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn("Telegram bot token/chat id təyin olunmayıb");
    return;
  }

  const dedupeKey = `${payload.message}-${payload.url}`;
  if (!shouldSend(dedupeKey)) return;

  const envLabel = ENV === "production" ? "🔴 PROD" : "🟡 DEV";
  const time = new Date().toLocaleString("az-AZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const lines = [
    `${envLabel} *Frontend Xətası*`,
    "",
    `📍 *Səhifə:*`,
    escapeMd(payload.url),
    "",
    `🕐 *Vaxt:* ${escapeMd(time)}`,
    "",
    `⚠️ *Xəta:*`,
    "```",
    payload.message.slice(0, 300),
    "```",
  ];

  if (payload.stack) {
    lines.push("", `📋 *Stack:*`, "```", payload.stack.slice(0, 600), "```");
  }

  if (payload.componentStack) {
    lines.push(
      "",
      `🧩 *Component:*`,
      "```",
      payload.componentStack.trim().split("\n")[1]?.trim() ?? "",
      "```",
    );
  }

  const text = lines.join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "MarkdownV2",
      }),
    });
  } catch (err) {
    console.error("Telegram bildirişi göndərilmədi:", err);
  }
}