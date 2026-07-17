import { useQuery } from "@tanstack/react-query";
import { usePagination } from "../../../shared/hooks/usePagination";
import { getOrders } from "../api/orders.service";

export function useOrders() {
  const { page, pageSize, onPageChange, onPageSizeChange } = usePagination(1, 5);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", page, pageSize],
    queryFn: () => getOrders({ page, pageSize }),
  });

  return {
    orders: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
  };
}