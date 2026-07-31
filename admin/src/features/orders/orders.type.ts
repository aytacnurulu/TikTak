// Order types live in shared/types/admin.types.ts (single source of truth).
// Re-exported here under this feature's existing names to avoid churn.
export type {
  OrderStatus,
  Order,
  OrderItem,
  OrderItemProduct as OrderProduct,
  OrderListResponse as OrdersListResponse,
  OrderStats as OrdersStats,
  OrderListQuery as OrdersQuery,
} from "../../shared/types/admin.types";
