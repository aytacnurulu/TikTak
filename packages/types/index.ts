export {};
export interface ApiResponse<T> {
  message: string;
  data: T;
  result: boolean;
}

export interface Pagination {
  next: number | null;
  prev: number | null;
  current: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}

export interface Category {
  id: number;
  name: string;
  img_url: string;
  description: string;
  created_at: string;
}

export interface Product {
  id: number;
  title: string;
  img_url: string;
  description: string;
  price: string;
  type: string;
  created_at: string;
  category: Pick<Category, "id" | "name">;
}

export interface Campaign {
  id: number;
  title: string;
  description: string | null;
  img_url: string | null;
  created_at: string;
}
