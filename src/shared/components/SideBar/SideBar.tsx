import { ConfigProvider, Menu } from "antd";
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
      {logo && (
        <div className="p-4 flex justify-center">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </div>
      )}

      <style>{`
        .sidebar-menu .ant-menu-item {
          border-bottom: 2px solid #F6F5FB;
        }
        .sidebar-menu .ant-menu-item:last-of-type {
          border-bottom: none;
        }
      `}</style>

      <ConfigProvider
        theme={{
          components: {
            Menu: {
              // aktiv (seçili) item
              itemSelectedColor: "#92D871",
              itemSelectedBg: "transparent",
              // hover
              itemHoverColor: "#92D871",
              itemHoverBg: "transparent",
              // ölçü / padding
              itemHeight: 52,
              itemPaddingInline: 24,
              itemMarginInline: 12,
              itemMarginBlock: 6,
              fontSize: 15,
            },
          },
        }}
      >
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
          className="flex-1 border-none sidebar-menu"
        />
      </ConfigProvider>
    </div>
  );
}