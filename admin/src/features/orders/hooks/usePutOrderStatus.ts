import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../shared/lib/axios";
import { API } from "../../../shared/constants/api.constant";
import { notifyError, notifySuccess } from "../../../shared/lib/notify";
import type { OrderStatus } from "../orders.type";

async function updateOrderStatus({
  id,
  status,
}: {
  id: number;
  status: OrderStatus;
}) {
  const response = await axiosInstance.put(API.ADMIN.ORDERS.UPDATE_STATUS(id), {
    status,
  });
  return response.data;
}

export function usePutOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders-stats"] });
      notifySuccess("Sifariş statusu uğurla yeniləndi");
    },
    onError: (error) => {
      console.error(error);
      notifyError("Sifariş statusu yenilənərkən xəta baş verdi");
    },
  });
}
