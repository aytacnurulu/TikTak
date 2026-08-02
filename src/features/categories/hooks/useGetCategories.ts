import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categories.service";

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
