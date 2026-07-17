import { Table } from "antd";
import type { TableProps } from "antd";
import { Pagination } from "./Pagination/Pagination";

interface DataTableProps<T> extends Omit<TableProps<T>, "pagination"> {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function DataTable<T extends object>({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  ...props
}: DataTableProps<T>) {
  return (
    <div>
      <Table<T>
        rowKey={(record: any) => record.id ?? record.key}
        pagination={false}
        className="[&_.ant-table]:!rounded-xl"
        {...props}
      />
      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}

interface TableActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TableActions({ onView, onEdit, onDelete }: TableActionsProps) {
  return (
    <div className="flex gap-3">
      {onView && (
        <a onClick={onView} className="text-gray-600">
          Göstər
        </a>
      )}
      {onEdit && (
        <a onClick={onEdit} className="text-gray-700">
          Düzəlt
        </a>
      )}
      {onDelete && (
        <a onClick={onDelete} className="text-red-500">
          Sil
        </a>
      )}
    </div>
  );
}