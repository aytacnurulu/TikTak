import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putCampaign } from "../api/campaigns.service";
import type { UpdateCampaignPayload } from "../types/campaign.type";

export function usePutCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateCampaignPayload;
    }) => putCampaign(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
}
