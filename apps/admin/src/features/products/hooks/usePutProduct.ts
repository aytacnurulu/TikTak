import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../api/products.service";
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
    },
  });
}