import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/products.service";
import { notifyError, notifySuccess } from "../../../shared/lib/notify";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notifySuccess("Məhsul uğurla silindi");
    },
    onError: (error) => {
      console.error(error);
      notifyError("Məhsul silinərkən xəta baş verdi");
    },
  });
}
