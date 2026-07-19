import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCampaign } from "../api/campaigns.service";

export function useDeleteCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return deleteCampaign(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
}
