import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore"; 
export interface SidebarItem {
  key: string;
  label: string;
  isLogout?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  logo?: string;
}

export function Sidebar({ items, logo }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="h-full flex flex-col bg-white">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items.map((item) => ({
          key: item.key,
          label: item.label,
          danger: item.isLogout,
        }))}
        onClick={({ key }) => {
          const item = items.find((i) => i.key === key);
          if (item?.isLogout) {
            logout();
            navigate("/login", { replace: true });
          } else {
            navigate(key);
          }
        }}
        className="flex-1 border-none"
      />
    </div>
  );
}