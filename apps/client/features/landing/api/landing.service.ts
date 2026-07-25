import { apiClient } from "@tiktak/api-client";
import type { ApiResponse, Campaign, Category } from "@tiktak/types";

export const landingService = {
  getCampaigns: async () => {
    const { data } = await apiClient.get<ApiResponse<Campaign[]>>(
      "/api/tiktak/campaigns",
    );
    return data.data;
  },
  getCategories: async () => {
    const { data } = await apiClient.get<ApiResponse<Category[]>>(
      "/api/tiktak/categories",
    );
    return data.data;
  },
};
