import { axiosInstance } from "../../../shared/lib/axios";
import { API } from "../../../shared/constants/api.constant";
import type {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
  ApiResponse,
} from "../types/category.type";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
async function getCategories() {
  const response = await axiosInstance.get<ApiResponse<Category[]>>(
    API.ADMIN.CATEGORY.LIST,
  );
  return response.data;
}

async function postCategories(payload: CreateCategoryPayload) {
  const response = await axiosInstance.post<ApiResponse<Category>>(
    API.ADMIN.CATEGORY.CREATE,
    payload,
  );
  return response.data;
}

async function putCategory(id: number, payload: UpdateCategoryPayload) {
  const response = await axiosInstance.put<ApiResponse<Category>>(
    API.ADMIN.CATEGORY.UPDATE(id),
    payload,
  );
  return response.data;
}

async function deleteCategory(id: number) {
  const response = await axiosInstance.delete<ApiResponse<null>>(
    API.ADMIN.CATEGORY.DELETE(id),
  );
  return response.data;
}

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function usePutCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateCategoryPayload;
    }) => putCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return deleteCategory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
