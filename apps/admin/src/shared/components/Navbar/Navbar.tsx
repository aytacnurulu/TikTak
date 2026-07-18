// shared/components/Navbar/Navbar.tsx
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface NavbarProps {
  title?: string;
  onSearch?: (value: string) => void;
}

export default function Navbar({ title = "TIK TAK ADMİN", onSearch }: NavbarProps) {
  return (
    <div className="h-16 bg-white flex items-center justify-between px-8 shrink-0">
      <h1 className="text-lg font-bold tracking-wide text-[#1a1a2e]">
        {title}
      </h1>

      <Input
        placeholder="Axtarış"
        prefix={<SearchOutlined className="text-[#B4B4C0]" />}
        onChange={(e) => onSearch?.(e.target.value)}
        className="max-w-[380px] bg-[#F5F5F9] border-none rounded-lg"
        style={{ backgroundColor: "#F0F0F7" }}
      />
    </div>
  );
}