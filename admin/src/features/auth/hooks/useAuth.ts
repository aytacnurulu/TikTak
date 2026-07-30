import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../shared/lib/axios";
import { API } from "../../../shared/constants/api.constant";
import { notifyError } from "../../../shared/lib/notify";
import type { LoginPayload } from "../auth.type";

async function postAuth(user: LoginPayload) {
  const response = await axiosInstance.post(API.ADMIN.AUTH.LOGIN, user);
  return response.data;
}

export function useAdminLogin() {
  return useMutation({
    mutationFn: postAuth,
    onError: (error) => {
      notifyError("Daxil olma əməliyyatı uğursuz oldu");
      console.error(error);
    },
  });
}
