import { Table } from "antd";
import type { TableProps } from "antd";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
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

// Skrinşotdakı "✏ Düzəlt" / "🗑 Sil" mətn-linklərini react-icons ilə
// əvəz edir. İstəsəniz mətni saxlayıb yanına ikon da qoya bilərsiniz —
// aşağıda hər ikisi göstərilib, lazımsız olanı silin.
export function TableActions({ onView, onEdit, onDelete }: TableActionsProps) {
  return (
    <div className="flex gap-4 items-center">
      {onView && (
        <button
          onClick={onView}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
          title="Göstər"
        >
          <FiEye size={16} />
        </button>
      )}
      {onEdit && (
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
          title="Düzəlt"
        >
          <FiEdit2 size={16} />
          <span className="text-sm">Düzəlt</span>
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="flex items-center gap-1 text-red-500 hover:text-red-700"
          title="Sil"
        >
          <FiTrash2 size={16} />
          <span className="text-sm">Sil</span>
        </button>
      )}
    </div>
  );
}
