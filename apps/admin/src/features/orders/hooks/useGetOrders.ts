import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/orders.service";

export function useGetOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}