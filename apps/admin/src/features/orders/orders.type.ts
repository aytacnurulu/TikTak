export interface Order {
  id: string;
  orderNo: string;
  date: string;
  deliveryAddress: string;
  itemsCount: number;
  subtotal: number;
  isFreeShipping: boolean;
  status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";
}

export interface OrdersStats {
  total: number;
  totalSales: number;
  pending: number;
  preparing: number;
  delivered: number;
  cancelled: number;
}

export interface OrdersQuery {
  page: number;
  pageSize: number;
}

export interface OrdersListResponse {
  data: Order[];
  total: number;
}