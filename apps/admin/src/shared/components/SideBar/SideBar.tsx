import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

export interface SidebarItem {
  key: string; // route path, məs: '/campaigns'
  label: string; // görünən ad, məs: 'Kampaniyalar'
  isLogout?: boolean; // true olsa onLogout çağrılır, navigate yox
}

interface SidebarProps {
  items: SidebarItem[];
  logo?: string;
  onLogout?: () => void;
}

// Sidebar tamamilə data-driven işləyir — hər layihə/panel öz linklərini
// items prop-u ilə verir, komponentin özü heç nə hardcode etmir.
export function Sidebar({ items, onLogout }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

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
            onLogout?.();
          } else {
            navigate(key);
          }
        }}
        className="flex-1 border-none"
      />
    </div>
  );
}

// İstifadə nümunəsi (hər panel/layihə üçün fərqli array verilə bilər):
//
// const ADMIN_NAV: SidebarItem[] = [
//   { key: '/campaigns', label: 'Kampaniyalar' },
//   { key: '/categories', label: 'Kateqoriyalar' },
//   { key: '/products', label: 'Məhsullar' },
//   { key: '/users', label: 'İstifadəçilər' },
//   { key: '/orders', label: 'Sifarişlər' },
//   { key: 'logout', label: 'Çıxış', isLogout: true },
// ];
