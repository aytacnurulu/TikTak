import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putCategory } from "../api/categories.service";
import type { UpdateCategoryPayload } from "../types/category.type";

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
