import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block w-1/2 shrink-0 relative">
        <img
          src="/image/auth-banner.svg"
          alt="TIK TAK"
          className="absolute inset-0 w-full h-full object-contain"
        />
        <Link href="/" className="absolute inset-0" aria-label="Ana səhifə" />
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[560px]">{children}</div>
      </div>
    </div>
  );
}
