import { LeftOutlined, RightOutlined, DownOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Göstəriləcək səhifə nömrələri: 1, 2, 3, 4, 5 ... son
  function getPageNumbers(): (number | "...")[] {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [1, 2, 3, 4, 5];
    if (page > 5 && page < totalPages) {
      pages.push("...", page);
    } else {
      pages.push("...");
    }
    pages.push(totalPages);
    return [...new Set(pages)] as (number | "...")[];
  }

  return (
    <div className="flex items-center justify-end gap-4 pt-4 text-sm text-gray-500">
      <span>
        {from}-{to} / {total} nəticə
      </span>

      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="w-7 h-7 flex items-center justify-center rounded-md disabled:opacity-30 hover:bg-gray-50"
      >
        <LeftOutlined className="text-xs" />
      </button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-1 text-gray-400">
              ···
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-7 h-7 flex items-center justify-center rounded-md text-sm ${
                p === page
                  ? "border border-green-500 text-green-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="w-7 h-7 flex items-center justify-center rounded-md disabled:opacity-30 hover:bg-gray-50"
      >
        <RightOutlined className="text-xs" />
      </button>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex items-center gap-1 border border-gray-200 rounded-md px-3 py-1.5 text-gray-600 hover:bg-gray-50"
        >
          {pageSize} / page
          <DownOutlined className="text-[10px]" />
        </button>

        {dropdownOpen && (
          <div className="absolute bottom-full mb-1 right-0 bg-white border border-gray-100 rounded-md shadow-lg overflow-hidden z-10">
            {pageSizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => {
                  onPageSizeChange(size);
                  setDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                  size === pageSize ? "text-green-600 font-medium" : "text-gray-600"
                }`}
              >
                {size} / page
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}