import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/orders.service";
import type { OrderListQuery } from "../../../shared/types/admin.types";

export function useGetOrders(query: OrderListQuery = {}) {
  return useQuery({
    queryKey: ["orders", query],
    queryFn: () => getOrders(query),
  });
}