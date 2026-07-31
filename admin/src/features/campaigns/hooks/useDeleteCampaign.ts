import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCampaign } from "../api/campaigns.service";
import { notifyError, notifySuccess } from "../../../shared/lib/notify";

export function useDeleteCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return deleteCampaign(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      notifySuccess("Kampaniya uğurla silindi");
    },
    onError: (error) => {
      console.error(error);
      notifyError("Kampaniya silinərkən xəta baş verdi");
    },
  });
}
