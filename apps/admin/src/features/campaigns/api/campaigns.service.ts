import { axiosInstance } from "../../../shared/lib/axios";
import { API } from "../../../shared/constants/api.constant";
import type {
  Campaign,
  CreateCampaignPayload,
  UpdateCampaignPayload,
  ApiResponse,
} from "../types/campaign.type";
export async function getCampaigns() {
  const response = await axiosInstance.get<ApiResponse<Campaign[]>>(
    API.ADMIN.CAMPAIGN.LIST,
  );
  return response.data;
}

export async function postCampaigns(payload: CreateCampaignPayload) {
  const response = await axiosInstance.post<ApiResponse<Campaign>>(
    API.ADMIN.CAMPAIGN.CREATE,
    payload,
  );
  return response.data;
}

export async function putCampaign(id: number, payload: UpdateCampaignPayload) {
  const response = await axiosInstance.put<ApiResponse<Campaign>>(
    API.ADMIN.CAMPAIGN.UPDATE(id),
    payload,
  );
  return response.data;
}

export async function deleteCampaign(id: number) {
  const response = await axiosInstance.delete<ApiResponse<null>>(
    API.ADMIN.CAMPAIGN.DELETE(id),
  );
  return response.data;
}
