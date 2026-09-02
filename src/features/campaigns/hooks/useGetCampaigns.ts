import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "@/features/campaigns/api/campaigns.service";

export function useGetCampaigns() {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: getCampaigns,
  });
}
