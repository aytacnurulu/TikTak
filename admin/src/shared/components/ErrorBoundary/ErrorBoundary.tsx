// src/shared/components/ErrorBoundary.tsx
import { Component, type ErrorInfo, type ReactNode } from "react";
import { notifyTelegramError } from "../../lib/telegram";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, errorMessage: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary tutdu:", error, errorInfo);

    notifyTelegramError({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      url: window.location.href,
    });
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-6">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>

            <h1 className="text-xl font-semibold text-[#1A1D28] mb-2">
              Gözlənilməz xəta baş verdi
            </h1>

            <p className="text-sm text-gray-500 mb-1">
              Problem barədə komandamıza artıq məlumat verildi.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Zəhmət olmasa səhifəni yeniləyin və ya ana səhifəyə qayıdın.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-lg border border-gray-200 text-[#2B3043] text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Səhifəni yenilə
              </button>
              <button
                onClick={this.handleReload}
                className="px-5 py-2.5 rounded-lg bg-[#2B3043] text-white text-sm font-medium hover:bg-[#1A1D28] transition-colors"
              >
                Ana səhifəyə qayıt
              </button>
            </div>

            {import.meta.env.DEV && this.state.errorMessage && (
              <div className="mt-8 p-4 bg-red-50 rounded-lg text-left">
                <p className="text-xs font-mono text-red-600 break-words">
                  {this.state.errorMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}