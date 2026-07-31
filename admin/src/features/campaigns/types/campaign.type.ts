export interface Campaign {
  id: number;
  title: string;
  description: string;
  img_url: string;
  created_at: string;
}

export interface CreateCampaignPayload {
  title: string;
  description: string;
  img_url?: string;
}

export type UpdateCampaignPayload = Partial<CreateCampaignPayload>;

export interface ApiResponse<T> {
  message: string;
  data: T;
  result: boolean;
}
