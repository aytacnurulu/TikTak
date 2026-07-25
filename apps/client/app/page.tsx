"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/shared/store/useAuthStore";
import LandingPage from "@/features/landing/pages/LandingPage";

export default function RootPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => !!s.accessToken);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  return <LandingPage />;
}
