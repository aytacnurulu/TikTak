export interface Category {
  id: number;
  name: string;
  description: string;
  img_url: string;
  created_at: string;
}

export interface CreateCategoryPayload {
  name: string;
  description: string;
  img_url?: string;
}

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;

export interface ApiResponse<T> {
  message: string;
  data: T;
  result: boolean;
}
