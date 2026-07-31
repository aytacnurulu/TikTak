// shared/components/Navbar/Navbar.tsx
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
  return (
    <div className="h-20 bg-white flex items-center justify-between px-8 shrink-0">
      <h1 className="text-xl font-bold tracking-wide text-[#1a1a2e]">
        {title}
      </h1>

      <Input
        placeholder="Axtarış"
        prefix={<SearchOutlined className="text-[#B4B4C0]" />}
        allowClear
        value={value}
        onChange={(e) => onSearch?.(e.target.value)}
        className="max-w-[520px] w-full bg-[#F5F5F9] border-none rounded-xl py-4"
        style={{ backgroundColor: "#F0F0F7" }}
        size="large"
      />
    </div>
  );
}
