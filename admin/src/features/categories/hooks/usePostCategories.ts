import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCategories } from "../api/categories.service";
import { notifyError, notifySuccess } from "../../../shared/lib/notify";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      notifySuccess("Kateqoriya uğurla yaradıldı");
    },
    onError: (error) => {
      console.error(error);
      notifyError("Kateqoriya yaradılarkən xəta baş verdi");
    },
  });
}
