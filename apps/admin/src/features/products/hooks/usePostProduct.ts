import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/products.service";
import { notifyError, notifySuccess } from "../../../shared/lib/notify";
import type {
  ProductCreateRequest,
  ProductResponse,
} from "../../../shared/types/admin.types";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<ProductResponse, Error, ProductCreateRequest>({
    mutationFn: (payload) => createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notifySuccess("Məhsul uğurla yaradıldı");
    },
    onError: (error) => {
      console.error(error);
      notifyError("Məhsul yaradılarkən xəta baş verdi");
    },
  });
}
