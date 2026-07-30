import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../api/categories.service";
import { notifyError, notifySuccess } from "../../../shared/lib/notify";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return deleteCategory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      notifySuccess("Kateqoriya uğurla silindi");
    },
    onError: (error) => {
      console.error(error);
      notifyError("Kateqoriya silinərkən xəta baş verdi");
    },
  });
}
