// shared/components/Navbar/Navbar.tsx
import { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface NavbarProps {
  title?: string;
  value?: string;
  onSearch?: (value: string) => void;
}

export default function Navbar({
  title = "TIK TAK ADMİN",
  value = "",
  onSearch,
}: NavbarProps) {
  // Input-un öz local state-i — bununla space, çoxlu boşluq və s. sərbəst yazıla bilir
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Xaricdən (URL-dən) gələn dəyər dəyişəndə (məs. "Təmizlə" basılanda) sync et
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setLocalValue(next); // dərhal ekranda göstər, heç nə itmir

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch?.(next); // yalnız bir az sonra parent-ə (URL-ə) göndər
    }, 400);
  }

  function handleClear() {
    setLocalValue("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    onSearch?.("");
  }

  return (
    <div className="h-20 bg-white flex items-center justify-center px-8 shrink-0">
      <div className="w-full max-w-[1600px] flex items-center justify-between gap-8">
        <h1 className="text-[30px] font-bold tracking-wide text-[#1a1a2e] whitespace-nowrap">
          {title}
        </h1>

        <Input
          placeholder="Axtarış"
          prefix={<SearchOutlined className="text-[#B4B4C0] mr-1" />}
          allowClear
          value={localValue}
          onChange={handleChange}
          onClear={handleClear}
          className="max-w-[520px] w-full !bg-[#F4F4FA] !border-none !rounded-full !py-3 !px-5 !shadow-none"
          size="large"
        />
      </div>
    </div>
  );
}