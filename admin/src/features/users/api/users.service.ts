import { axiosInstance } from "../../../shared/lib/axios";
import { API } from "../../../shared/constants/api.constant";
import type { AdminUsersListResponse } from "../../../shared/types/admin.types";

export async function getUsers() {
  const response = await axiosInstance.get<AdminUsersListResponse>(
    API.ADMIN.USERS.LIST,
  );
  return response.data;
}
