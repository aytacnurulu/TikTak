import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCategories } from "../api/categories.service";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
