import { message } from "antd";
import axios from "axios";

message.config({
  top: 24,
  duration: 4,
  maxCount: 3,
});

export function notifySuccess(text: string) {
  message.success(text);
}

export function notifyError(text: string) {
  message.error(text);
}

export function notifyInfo(text: string) {
  message.info(text);
}

export function getApiErrorMessage(
  error: unknown,
  fallback = "Xəta baş verdi",
) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }

    if (typeof data?.error === "string" && data.error.trim()) {
      return data.error;
    }

    if (typeof data?.detail === "string" && data.detail.trim()) {
      return data.detail;
    }

    if (typeof error.message === "string" && error.message.trim()) {
      return error.message;
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}
