import { Table } from "antd";
import type { TableProps } from "antd";
// Bütün səhifələrdə (Kampaniyalar, Kateqoriyalar, Məhsullar, İstifadəçilər,
// Sifarişlər) eyni skelet təkrarlanır: sıra nömrəsi, sağda əməliyyat sütunu,
// aşağıda "1-5 / N nəticə" formatlı pagination. Fərqli olan yalnız `columns`
// və `dataSource`-dur — onları hər səhifə özü verir.
export function DataTable<T extends object>(props: TableProps<T>) {
  return (
    <Table<T>
      rowKey={(record: any) => record.id ?? record.key}
      pagination={{
        pageSize: 5,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} / ${total} nəticə`,
        ...props.pagination,
      }}
      className="[&_.ant-table]:!rounded-xl"
      {...props}
    />
  );
}

interface TableActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

// Skrinşotlarda "düzəlt / sil" (Kampaniyalar, Kateqoriyalar, Məhsullar) və
// "Göstər" (İstifadəçilər, Sifarişlər) fərqli mətnlərlə görünür, amma
// məntiq eynidir — ona görə tək komponentdə, lazım olan action-ları
// prop kimi ötürürük.
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
