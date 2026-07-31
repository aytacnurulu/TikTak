import { axiosInstance } from "../../../shared/lib/axios";
import { API } from "../../../shared/constants/api.constant";
import type { OrdersQuery, OrdersListResponse, OrdersStats } from "../orders.type";

export async function getOrders(query: OrdersQuery) {
  const response = await axiosInstance.get<OrdersListResponse>(API.ADMIN.ORDERS.LIST, {
    params: query,
  });
  return response.data;
}

export async function getOrdersStats() {
  const response = await axiosInstance.get<OrdersStats>(API.ADMIN.ORDERS.STATS);
  return response.data;
}