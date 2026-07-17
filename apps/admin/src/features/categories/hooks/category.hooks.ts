import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryApi } from "../api/categories.service";
import type {
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "../types/category.type";

const CATEGORY_QUERY_KEY = ["categories"];

export const useCategories = () => {
  return useQuery({
    queryKey: CATEGORY_QUERY_KEY,
    queryFn: categoryApi.getAll,
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) => categoryApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEY });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateCategoryPayload;
    }) => categoryApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEY });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => categoryApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEY });
    },
  });
};
