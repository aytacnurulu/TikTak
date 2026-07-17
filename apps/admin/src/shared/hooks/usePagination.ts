import { useState } from "react";

export function usePagination(initialPage = 1, initialPageSize = 5) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const onPageChange = (newPage: number) => setPage(newPage);
  const onPageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1); // page size dəyişəndə 1-ci səhifəyə qayıt
  };

  return { page, pageSize, onPageChange, onPageSizeChange };
}