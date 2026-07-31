import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../api/products.service";
import { notifyError, notifySuccess } from "../../../shared/lib/notify";
import type { ProductUpdateRequest } from "../../../shared/types/admin.types";

interface UpdateProductParams {
  id: number;
  payload: ProductUpdateRequest;
}

export function usePutProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateProductParams) =>
      updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notifySuccess("Məhsul uğurla yeniləndi");
    },
    onError: (error) => {
      console.error(error);
      notifyError("Məhsul yenilənərkən xəta baş verdi");
    },
  });
}
