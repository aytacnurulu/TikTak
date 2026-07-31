import { axiosInstance } from "../../../shared/lib/axios";
import { API } from "../../../shared/constants/api.constant";
import type {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
  ApiResponse,
} from "../types/category.type";
export async function getCategories() {
  const response = await axiosInstance.get<ApiResponse<Category[]>>(
    API.ADMIN.CATEGORY.LIST,
  );
  return response.data;
}

export async function postCategories(payload: CreateCategoryPayload) {
  const response = await axiosInstance.post<ApiResponse<Category>>(
    API.ADMIN.CATEGORY.CREATE,
    payload,
  );
  return response.data;
}

export async function putCategory(id: number, payload: UpdateCategoryPayload) {
  const response = await axiosInstance.put<ApiResponse<Category>>(
    API.ADMIN.CATEGORY.UPDATE(id),
    payload,
  );
  return response.data;
}

export async function deleteCategory(id: number) {
  const response = await axiosInstance.delete<ApiResponse<null>>(
    API.ADMIN.CATEGORY.DELETE(id),
  );
  return response.data;
}
