import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putCampaign } from "../api/campaigns.service";
import { notifyError, notifySuccess } from "../../../shared/lib/notify";
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
      notifySuccess("Kampaniya uğurla yeniləndi");
    },
    onError: (error) => {
      console.error(error);
      notifyError("Kampaniya yenilənərkən xəta baş verdi");
    },
  });
}
