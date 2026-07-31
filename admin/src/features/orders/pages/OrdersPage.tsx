import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { DataTable, TableActions } from "../../../shared/components/DataTable";
import { StatsCard } from "../components/StatsCard";
import { OrderDetailModal } from "../components/OrderDetailModal";
import { useGetOrders } from "../hooks/useGetOrders";
import { useGetOrdersStats } from "../hooks/useGetOrdersStats";
import { usePutOrderStatus } from "../hooks/usePutOrderStatus";
import { StatusTag, type StatusTagProps } from "../components/StatusTag";
import type { Order, OrderStatus } from "../orders.type";

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string }> = {
  PENDING: { label: "Gözləyir", color: "orange" },
  CONFIRMED: { label: "Təsdiqləndi", color: "blue" },
  PREPARING: { label: "Hazırlanır", color: "purple" },
  READY: { label: "Hazırdır", color: "cyan" },
  DELIVERED: { label: "Çatdırıldı", color: "green" },
  CANCELLED: { label: "Ləğv edildi", color: "red" },
};

const DEFAULT_STATUS_CONFIG = { label: "Naməlum", color: "default" };

function formatCurrency(value: number | string | null | undefined) {
  const numericValue = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numericValue)) return "—";
  return `${numericValue.toFixed(2)} ₼`;
}

function getStatusConfig(status: string | undefined) {
  if (!status) return DEFAULT_STATUS_CONFIG;
  return STATUS_CONFIG[status as OrderStatus] ?? DEFAULT_STATUS_CONFIG;
}

function OrdersPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // ---------- Data ----------
  const { data, isLoading } = useGetOrders();
  const { data: stats } = useGetOrdersStats();
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    usePutOrderStatus();

  const orders: Order[] = useMemo(() => data?.data ?? [], [data]);

  const filteredOrders = useMemo(() => {
    if (!search) return orders;
    return orders.filter((order) =>
      [order.orderNumber, order.address]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search),
    );
  }, [orders, search]);

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  // ---------- Handlers ----------
  function handleStatusChange(id: number, status: OrderStatus) {
    updateStatus({ id, status });
    setSelectedOrder((prev) => (prev ? { ...prev, status } : prev));
  }

  // ---------- Table columns ----------
  const columns: ColumnsType<Order> = [
    {
      title: "No",
      dataIndex: "orderNumber",
      key: "orderNumber",
      width: 140,
      render: (orderNumber: string) => (
        <span className="font-medium text-gray-700">{orderNumber}</span>
      ),
    },
    {
      title: "Tarix",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (createdAt: string) => (
        <span className="text-gray-600">
          {new Date(createdAt).toLocaleDateString("az-AZ", {
            day: "2-digit",
            month: "2-digit",
          })}
        </span>
      ),
    },
    {
      title: "Çatdırılma ünvanı",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
      filters: Array.from(new Set(orders.map((o) => o.address))).map(
        (addr) => ({
          text: addr,
          value: addr,
        }),
      ),
      onFilter: (value, record) => record.address === value,
      render: (address: string) => (
        <span className="text-gray-600">{address}</span>
      ),
    },
    {
      title: "Məhsul sayı",
      key: "itemsCount",
      width: 110,
      sorter: (a, b) =>
        a.items.reduce((s, i) => s + i.quantity, 0) -
        b.items.reduce((s, i) => s + i.quantity, 0),
      render: (_value, record) =>
        record.items.reduce((sum, item) => sum + item.quantity, 0),
    },
    {
      title: "Məbləğ",
      key: "total",
      width: 180,
      sorter: (a, b) => Number(a.total) - Number(b.total),
      render: (_value, record) => (
        <div className="flex flex-col">
          <span className="font-medium">{formatCurrency(record.total)}</span>
          {Number(record.deliveryFee) === 0 ? (
            <span className="text-green-500 text-xs">Pulsuz çatdırılma</span>
          ) : (
            <span className="text-gray-400 text-xs">
              Çatdırılma əlavə olunur
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 140,
      filters: Object.entries(STATUS_CONFIG).map(([value, cfg]) => ({
        text: cfg.label,
        value,
      })),
      onFilter: (value, record) => record.status === value,
      render: (status: string) => {
        const config = getStatusConfig(status);
        return (
          <StatusTag
            label={config.label}
            color={config.color as StatusTagProps["color"]}
          />
        );
      },
    },
    {
      title: "Əməliyyat",
      key: "actions",
      width: 100,
      render: (_value, record) => (
        <TableActions onView={() => setSelectedOrder(record)} />
      ),
    },
  ];

  const statsItems = [
    {
      label: "Ümumi sifarişlər",
      value: stats?.TOTAL ?? "-",
      icon: <ShoppingCartOutlined />,
      iconColor: "text-blue-500",
    },
    {
      label: "Ümumi satış",
      value:
        stats?.TOTAL_REVENUE != null
          ? Number(stats.TOTAL_REVENUE).toFixed(2)
          : "-",
      icon: <DollarOutlined />,
      iconColor: "text-green-500",
      trend: "up" as const,
    },
    {
      label: "Gözləyən",
      value: stats?.PENDING ?? "-",
      icon: <ClockCircleOutlined />,
      iconColor: "text-orange-400",
    },
    {
      label: "Hazırlanır",
      value: stats?.PREPARING ?? "-",
      icon: <FieldTimeOutlined />,
      iconColor: "text-purple-500",
    },
    {
      label: "Çatdırılan",
      value: stats?.DELIVERED ?? "-",
      icon: <CheckCircleOutlined />,
      iconColor: "text-green-500",
    },
    {
      label: "Ləğv edilən",
      value: 0,
      icon: <CloseCircleOutlined />,
      iconColor: "text-red-500",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sifarişlər</h1>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-6">
        {statsItems.map((item) => (
          <StatsCard key={item.label} {...item} />
        ))}
      </div>

      <DataTable<Order>
        columns={columns}
        dataSource={paginatedOrders}
        loading={isLoading}
        page={page}
        pageSize={pageSize}
        total={filteredOrders.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      <OrderDetailModal
        order={selectedOrder}
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onStatusChange={handleStatusChange}
        isUpdatingStatus={isUpdatingStatus}
      />
    </div>
  );
}

export default OrdersPage;
