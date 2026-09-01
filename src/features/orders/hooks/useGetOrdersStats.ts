import { useQuery } from "@tanstack/react-query";
import { getOrdersStats } from "@/features/orders/api/orders.service";

export function useGetOrdersStats() {
  return useQuery({
    queryKey: ["orders-stats"],
    queryFn: getOrdersStats,
  });
}