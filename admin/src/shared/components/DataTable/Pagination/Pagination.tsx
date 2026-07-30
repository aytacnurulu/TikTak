import { Pagination as AntdPagination } from "antd";

interface Props {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: Props) {
  return (
    <div className="flex justify-end mt-4">
      <AntdPagination
        current={page}
        pageSize={pageSize}
        total={total}
        showSizeChanger
        onChange={(p, size) => {
          onPageChange(p);
          if (size) onPageSizeChange(size);
        }}
        pageSizeOptions={[5, 10, 20, 50].map(String)}
      />
    </div>
  );
}
