"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../api/auth.service";
import { useAuthStore } from "@/shared/store/useAuthStore";

export const useLoginMutation = () => {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth({
        accessToken: data.tokens.access_token,
        refreshToken: data.tokens.refresh_token,
        role: data.profile.role,
      });
      router.replace("/home");
    },
  });
};

export const useSignupMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.signup,
    onSuccess: () => {
      // TODO: backend-də OTP endpoint-i yoxdur (Postman collection-da yalnız
      // login/signup/refresh var). OTP hazır olanda bura
      // router.push(`/verify-otp?phone=${variables.phone}`) yazılacaq.
      router.replace("/login");
    },
  });
};
