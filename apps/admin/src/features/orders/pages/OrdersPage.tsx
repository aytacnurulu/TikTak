import { Tag } from "antd";
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
import { useOrders } from "../hooks/useOrders";
import { useOrdersStats } from "../hooks/useOrdersStats";
import type { Order } from "../orders.type";
import type { TagProps } from "antd";

const STATUS_CONFIG: Record<Order["status"], { label: string; color: string }> =
  {
    PENDING: { label: "Gözləyir", color: "orange" },
    CONFIRMED: { label: "Təsdiqləndi", color: "blue" },
    PREPARING: { label: "Hazırlanır", color: "purple" },
    DELIVERED: { label: "Çatdırıldı", color: "green" },
    CANCELLED: { label: "Ləğv edildi", color: "red" },
  };

const DEFAULT_STATUS_CONFIG = { label: "Naməlum", color: "default" };

export default function OrdersPage() {
  const {
    orders,
    total,
    isLoading,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
  } = useOrders();
  const { data: stats } = useOrdersStats();

  const columns = [
    { title: "No", dataIndex: "orderNo", key: "orderNo" },
    { title: "Tarix", dataIndex: "date", key: "date" },
    {
      title: "Çatdırılma ünvanı",
      dataIndex: "deliveryAddress",
      key: "deliveryAddress",
    },
    { title: "Məhsul sayı", dataIndex: "itemsCount", key: "itemsCount" },
    {
      title: "Subtotal/Çatdırılma",
      key: "subtotal",
      render: (_: unknown, record: Order) => (
        <span>
          {record.orderNo} ₼
          {record.isFreeShipping && (
            <span className="text-green-500 text-xs ml-1">· Pulsuz</span>
          )}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // render:
      render: (status: Order["status"]) => {
        const config = STATUS_CONFIG[status] ?? DEFAULT_STATUS_CONFIG;
        return <Tag color={config.color}>{config.label}</Tag>;
      },
    },
    {
      title: "Əməliyyat",
      key: "actions",
      render: (_: unknown, record: Order) => (
        <TableActions onView={() => console.log("view", record.id)} />
      ),
    },
  ];

  const statsItems = [
    {
      label: "Ümumi sifarişlər",
      value: stats?.total ?? "-",
      icon: <ShoppingCartOutlined />,
      iconColor: "text-blue-500",
    },
    {
      label: "Ümumi satış",
      value: stats?.totalSales != null ? stats.totalSales.toFixed(2) : "-",
      icon: <DollarOutlined />,
      iconColor: "text-green-500",
      trend: "up" as const,
    },
    {
      label: "Gözləyən",
      value: stats?.pending ?? "-",
      icon: <ClockCircleOutlined />,
      iconColor: "text-orange-400",
    },
    {
      label: "Hazırlanır",
      value: stats?.preparing ?? "-",
      icon: <FieldTimeOutlined />,
      iconColor: "text-purple-500",
    },
    {
      label: "Çatdırılan",
      value: stats?.delivered ?? "-",
      icon: <CheckCircleOutlined />,
      iconColor: "text-green-500",
    },
    {
      label: "Ləğv edilən",
      value: stats?.cancelled ?? "-",
      icon: <CloseCircleOutlined />,
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Sifarişlər</h1>

      <div className="flex border border-gray-100 rounded-xl mb-6">
        {statsItems.map((item, i) => (
          <StatsCard
            key={item.label}
            {...item}
            isLast={i === statsItems.length - 1}
          />
        ))}
      </div>

      <DataTable<Order>
        columns={columns}
        dataSource={orders}
        loading={isLoading}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
