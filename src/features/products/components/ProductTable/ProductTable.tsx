import type { ColumnsType } from "antd/es/table";
import {
  DataTable,
  TableActions,
  TableCell,
} from "@/shared/components/DataTable";
import type { Product } from "@/shared/types/admin.types";

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
  {
    title: "Başlıq",
    dataIndex: "title",
    key: "title",
    render: (title: string) => <TableCell>{title}</TableCell>,
  },
  {
    title: "Kateqoriya",
    key: "category",
    render: (_value, record) => (
      <TableCell>{record.category?.name ?? "-"}</TableCell>
    ),
  },
  {
    title: "Növ",
    dataIndex: "type",
    key: "type",
    render: (type: Product["type"]) => <TableCell>{type}</TableCell>,
  },
  {
    title: "Qiymət",
    dataIndex: "price",
    key: "price",
    render: (price: string) => (
      <TableCell>{`${Number(price).toFixed(2)} ₼`}</TableCell>
    ),
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
