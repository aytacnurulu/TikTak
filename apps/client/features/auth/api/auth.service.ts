import { apiClient } from "@tiktak/api-client";
import { API } from "@tiktak/constants";
import type {
  ApiResponse,
  LoginPayload,
  LoginResponseData,
  SignupPayload,
} from "@tiktak/types";

export const authService = {
  login: async (payload: LoginPayload) => {
    const { data } = await apiClient.post<ApiResponse<LoginResponseData>>(
      API.CLIENT.AUTH.LOGIN,
      payload,
    );
    return data.data;
  },
  signup: async (payload: SignupPayload) => {
    const { data } = await apiClient.post<ApiResponse<null>>(
      API.CLIENT.AUTH.SIGNUP,
      payload,
    );
    return data;
  },
};
