import { apiClient } from "@tiktak/api-client";
import { API } from "@tiktak/constants";
import type { ApiResponse, Campaign, Category } from "@tiktak/types";

export const landingService = {
  getCampaigns: async () => {
    const { data } = await apiClient.get<ApiResponse<Campaign[]>>(
      API.CLIENT.CAMPAIGN.LIST,
    );
    return data.data;
  },
  getCategories: async () => {
    const { data } = await apiClient.get<ApiResponse<Category[]>>(
      API.CLIENT.CATEGORY.LIST,
    );
    return data.data;
  },
};
