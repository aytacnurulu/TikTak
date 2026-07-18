import { useQuery } from "@tanstack/react-query";
import { getOrdersStats } from "../api/orders.service";

export function useGetOrdersStats() {
  return useQuery({
    queryKey: ["orders-stats"],
    queryFn: getOrdersStats,
  });
}