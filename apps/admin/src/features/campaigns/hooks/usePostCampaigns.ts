import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCampaigns } from "../api/campaigns.service";
import { notifyError, notifySuccess } from "../../../shared/lib/notify";

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCampaigns,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      notifySuccess("Kampaniya uğurla yaradıldı");
    },
    onError: (error) => {
      console.error(error);
      notifyError("Kampaniya yaradılarkən xəta baş verdi");
    },
  });
}
