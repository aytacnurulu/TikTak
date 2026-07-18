import { Modal, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import type { Order, OrderStatus } from "../orders.type";

interface OrderDetailModalProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (id: number, status: OrderStatus) => void;
  isUpdatingStatus?: boolean;
}

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "PENDING", label: "Gözləyir" },
  { value: "CONFIRMED", label: "Təsdiqləndi" },
  { value: "PREPARING", label: "Hazırlanır" },
  { value: "READY", label: "Hazırdır" },
  { value: "DELIVERED", label: "Çatdırıldı" },
  { value: "CANCELLED", label: "Ləğv edildi" },
];

const PAYMENT_LABELS: Record<string, string> = {
  CARD: "Kart",
  CASH: "Nağd",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toISOString().slice(0, 10);
}

export function OrderDetailModal({
  order,
  open,
  onClose,
  onStatusChange,
  isUpdatingStatus,
}: OrderDetailModalProps) {
  if (!order) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      width={640}
      className="[&_.ant-modal-content]:p-0! [&_.ant-modal-content]:rounded-2xl! [&_.ant-modal-content]:overflow-hidden!"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
            {order.id}
          </div>
          <span className="font-semibold text-gray-900 text-lg">
            {order.orderNumber}
          </span>
        </div>

        <div className="flex items-center gap-8">
          <div>
            <div className="text-xs text-gray-400 mb-1">Status</div>
            <Select
              value={order.status}
              options={STATUS_OPTIONS}
              onChange={(value) => onStatusChange(order.id, value)}
              disabled={isUpdatingStatus}
              className="w-35"
            />
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">Ümumi məbləğ</div>
            <div className="text-red-500 font-semibold text-lg">
              {Number(order.total).toFixed(2)} ₼
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            <CloseOutlined />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {/* Sifariş məlumatları */}
        <div className="bg-gray-50 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Sifariş Məlumatları</h3>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-gray-400 w-36">Tarix :</span>
              <span className="text-gray-700">{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-400 w-36">Çatdırılma Ünvanı :</span>
              <span className="text-gray-700">{order.address}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-400 w-36">Telefon :</span>
              <span className="text-gray-700">{order.phone}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-400 w-36">Ödəmə Metodu :</span>
              <span className="text-gray-700">
                {PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}
              </span>
            </div>
          </div>
        </div>

        {/* Məhsullar */}
        <div className="bg-gray-50 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-4">
            Məhsullar ({order.items.length})
          </h3>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.product.img_url || "/placeholder-product.png"}
                  alt={item.product.title}
                  className="w-12 h-12 rounded-lg object-cover bg-gray-200"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {item.product.title}
                  </div>
                  <div className="text-xs text-gray-400">
                    {item.product.category.name} · {item.quantity} {item.product.type}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-medium">
                    {Number(item.total_price).toFixed(2)} ₼
                  </div>
                  <div className="text-xs text-gray-400">
                    {Number(item.product.price).toFixed(2)} ₼/{item.product.type}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-3 text-sm text-gray-500">
            Çatdırılma:{" "}
            {Number(order.deliveryFee) === 0
              ? "Pulsuz"
              : `${Number(order.deliveryFee).toFixed(2)} ₼`}
          </div>
        </div>
      </div>
    </Modal>
  );
}