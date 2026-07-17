import { axiosInstance } from "../../../shared/lib/axios";
import { CATEGORY_ENDPOINTS } from "../constants/endpoint";
import type {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
  ApiResponse,
} from "../types/category.type";

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await axiosInstance.get<ApiResponse<Category[]>>(
      CATEGORY_ENDPOINTS.LIST,
    );
    return data.data;
  },

  create: async (payload: CreateCategoryPayload): Promise<Category> => {
    const { data } = await axiosInstance.post<ApiResponse<Category>>(
      CATEGORY_ENDPOINTS.CREATE,
      payload,
    );
    return data.data;
  },

  update: async (
    id: number,
    payload: UpdateCategoryPayload,
  ): Promise<Category> => {
    const { data } = await axiosInstance.put<ApiResponse<Category>>(
      CATEGORY_ENDPOINTS.UPDATE(id),
      payload,
    );
    return data.data;
  },

  remove: async (id: number): Promise<void> => {
    await axiosInstance.delete(CATEGORY_ENDPOINTS.DELETE(id));
  },
};
