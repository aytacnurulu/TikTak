import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products.service";
import type { ProductListQuery } from "../../../shared/types/admin.types";

export function useGetProducts(query: ProductListQuery) {
  return useQuery({
    queryKey: ["products", query],
    queryFn: () => getProducts(query),
  });
}