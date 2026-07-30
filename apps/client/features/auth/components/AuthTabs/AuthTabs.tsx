"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthTabs = () => {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <div className="flex justify-center gap-6 mb-6 border-b border-gray-100">
      <Link
        href="/login"
        className={`pb-3 text-sm font-medium border-b-2 -mb-px ${
          isLogin
            ? "border-primary text-primary"
            : "border-transparent text-gray-400"
        }`}
      >
        Daxil ol
      </Link>
      <Link
        href="/register"
        className={`pb-3 text-sm font-medium border-b-2 -mb-px ${
          !isLogin
            ? "border-primary text-primary"
            : "border-transparent text-gray-400"
        }`}
      >
        Qeydiyyatdan keç
      </Link>
    </div>
  );
};

export default AuthTabs;
