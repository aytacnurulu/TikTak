import { useQuery } from "@tanstack/react-query";
import { getOrdersStats } from "../api/orders.service";

export function useOrdersStats() {
  return useQuery({
    queryKey: ["orders-stats"],
    queryFn: getOrdersStats,
  });
}