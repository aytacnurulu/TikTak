export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderProduct {
  id: number;
  title: string;
  img_url: string;
  description: string;
  price: string;
  type: string;
  created_at: string;
  category: {
    id: number;
    name: string;
    img_url?: string;
    description?: string;
    created_at?: string;
  };
}

export interface OrderItem {
  id: number;
  quantity: number;
  total_price: string;
  product: OrderProduct;
}

export interface Order {
  id: number;
  orderNumber: string;
  total: string;
  deliveryFee: string;
  paymentMethod: "CARD" | "CASH";
  status: OrderStatus;
  note: string | null;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    full_name: string;
    img_url: string | null;
  };
  items: OrderItem[];
}

export interface OrdersQuery {
  page?: number;
  limit?: number;
  status?: OrderStatus;
}

export interface OrdersListResponse {
  message: string;
  data: Order[];
  result: boolean;
}

export interface OrdersStats {
  TOTAL: number;
  DELIVERED: number;
  PENDING: number;
  PREPARING: number;
  TOTAL_REVENUE: number;
}
