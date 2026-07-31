import type { ColumnsType } from "antd/es/table";
import {
  DataTable,
  TableActions,
} from "../../../../shared/components/DataTable";
import type { Product } from "../../../../shared/types/admin.types";

interface ProductTableProps {
  data: Product[];
  onEdit: (row: Product) => void;
  onDelete: (row: Product) => void;
}

const buildColumns = (
  onEdit: (row: Product) => void,
  onDelete: (row: Product) => void,
): ColumnsType<Product> => [
  { title: "No", key: "id", render: (_value, _record, index) => index + 1 },
  { title: "Başlıq", dataIndex: "title", key: "title" },
  {
    title: "Kateqoriya",
    key: "category",
    render: (_value, record) => record.category?.name ?? "-",
  },
  { title: "Növ", dataIndex: "type", key: "type" },
  {
    title: "Qiymət",
    dataIndex: "price",
    key: "price",
    render: (price: string) => `${Number(price).toFixed(2)} ₼`,
  },
  {
    title: "Əməliyyat",
    key: "actions",
    render: (_value, record) => (
      <TableActions
        onEdit={() => onEdit(record)}
        onDelete={() => onDelete(record)}
      />
    ),
  },
];

export function ProductTable({ data, onEdit, onDelete }: ProductTableProps) {
  const columns = buildColumns(onEdit, onDelete);
  return (
    <DataTable<Product>
      columns={columns as any}
      dataSource={data}
      page={1}
      pageSize={data.length || 10}
      total={data.length}
      onPageChange={() => undefined}
      onPageSizeChange={() => undefined}
    />
  );
}
