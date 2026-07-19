import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCampaigns } from "../api/campaigns.service";

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCampaigns,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
}
