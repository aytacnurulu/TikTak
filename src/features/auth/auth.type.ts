import type { AdminProfile } from "../../shared/types/admin.types";

export interface LoginPayload {
  phone: string;
  password: string;
}

export interface LoginResponseData {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
  profile: AdminProfile;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
  result: boolean;
}
