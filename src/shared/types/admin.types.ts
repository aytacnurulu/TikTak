// src/types/admin.types.ts

// ---------- Enums ----------

export const UserRole = {
  ADMIN: "ADMIN",
  COMMERCE: "COMMERCE",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const ProductMeasure = {
  KG: "kg",
  GR: "gr",
  LITRE: "litre",
  ML: "ml",
  METER: "meter",
  CM: "cm",
  MM: "mm",
  PIECE: "piece",
  PACKET: "packet",
  BOX: "box",
} as const;

export type ProductMeasure =
  (typeof ProductMeasure)[keyof typeof ProductMeasure];

export const OrderStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PREPARING: "PREPARING",
  READY: "READY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const PaymentMethod = {
  CASH: "CASH",
  CARD: "CARD",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

// ---------- Common ----------

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

export interface PaginatedResponse<T> {
  message: string;
  data: T[];
  pagination: Pagination;
  result: boolean;
}

// ---------- Auth ----------

export interface AdminLoginRequest {
  phone: string;
  password: string;
}

export interface AdminProfile {
  id: number;
  full_name: string;
  phone: string;
  address: string | null;
  img_url: string | null;
  role: UserRole;
  created_at: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface AdminLoginResponseData {
  tokens: AuthTokens;
  profile: AdminProfile;
}

export type AdminLoginResponse = ApiResponse<AdminLoginResponseData>;
export type AdminProfileResponse = ApiResponse<AdminProfile>;

// ---------- Users ----------

export interface AdminUser {
  id: number;
  full_name: string;
  phone: string;
  address: string | null;
  img_url: string | null;
  role: UserRole;
  created_at: string;
  password?: string; // backend hash-i qaytarır, FE-də istifadə/saxlama etmə
}

export type AdminUsersListResponse = ApiResponse<AdminUser[]>;

// ---------- Category ----------

export interface Category {
  id: number;
  name: string;
  img_url: string;
  description: string;
  created_at: string;
}

export interface CategoryCreateRequest {
  name: string;
  description: string;
  img_url?: string;
}

export interface CategoryUpdateRequest {
  name: string;
  description: string;
  img_url?: string;
}

export type CategoryListResponse = ApiResponse<Category[]>;
export type CategoryResponse = ApiResponse<Category>;

// ---------- Products ----------
export interface Product {
  id: number;
  title: string;          // "name" yox — backend "title" qaytarır
  description: string;
  img_url: string;
  category: Category;
  type: ProductMeasure;   // "string" yox — enum
  price: string;          // backend string qaytarır (Create/Update request kimi)
  created_at: string;
}
export interface ProductCategory {
  id: number;
  name: string;
  img_url?: string;
  description?: string;
  created_at?: string;
}

export interface ProductCreateRequest {
  title: string;
  description: string;
  price: string;
  type: ProductMeasure;
  img_url?: string;
  category_id: number;
}

export type ProductUpdateRequest = ProductCreateRequest;

export interface ProductListQuery {
  limit?: number;
  page?: number;
  search?: string;
  category_id?: number;
}

export type ProductListResponse = PaginatedResponse<Product>;
export type ProductResponse = ApiResponse<Product>;

// ---------- Campaign ----------

export interface Campaign {
  id: number;
  title: string;
  description: string | null;
  img_url: string | null;
  created_at: string;
}

export interface CampaignCreateRequest {
  title: string;
  description: string;
  img_url?: string;
}

export type CampaignUpdateRequest = CampaignCreateRequest;

export type CampaignListResponse = ApiResponse<Campaign[]>;
export type CampaignResponse = ApiResponse<Campaign>;

// ---------- Orders ----------

export interface OrderUser {
  id: number;
  full_name: string;
  img_url: string | null;
}

export interface OrderItemProduct {
  id: number;
  title: string;
  img_url: string;
  description: string;
  price: string;
  type: ProductMeasure;
  created_at: string;
  category: ProductCategory;
}

export interface OrderItem {
  id: number;
  quantity: number;
  total_price: string;
  product: OrderItemProduct;
}

export interface OrderListQuery {
  limit?: number;
  page?: number;
  status?: OrderStatus;
}

export interface Order {
  id: number;
  orderNumber: string;
  total: string;
  deliveryFee: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  note: string | null;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  user?: OrderUser; // list-də var, update-status cavabında yoxdur
  items: OrderItem[];
}

export interface OrderStats {
  TOTAL: number;
  DELIVERED: number;
  PENDING: number;
  PREPARING: number;
  TOTAL_REVENUE: number;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

export type OrderListResponse = PaginatedResponse<Order>;
export type OrderResponse = ApiResponse<Order>;
