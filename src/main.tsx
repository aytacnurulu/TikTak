// src/main.tsx
import '@ant-design/v5-patch-for-react-19';
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./app/index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./shared/components/ErrorBoundary/ErrorBoundary";
import { notifyTelegramError } from "./shared/lib/telegram";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 1 dəqiqə ərzində data "fresh" sayılır — sidebar-da səhifələr
      // arasında gəzəndə cache-dən oxunur, lüzumsuz refetch getmir.
      // Add/edit/delete-dən sonra mutation-lar `invalidateQueries`
      // çağırdığı üçün siyahı yenə dərhal təzələnir.
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Render bloklarında tutulmayan xətalar (event handler, sync kod)
window.addEventListener("error", (event) => {
  notifyTelegramError({
    message: event.message,
    stack: event.error?.stack,
    url: window.location.href,
  });
});

// async/await, Promise.reject və s. tutulmayan xətalar
window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  notifyTelegramError({
    message:
      reason instanceof Error
        ? reason.message
        : `Unhandled Promise Rejection: ${String(reason)}`,
    stack: reason instanceof Error ? reason.stack : undefined,
    url: window.location.href,
  });
});

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </ErrorBoundary>
);