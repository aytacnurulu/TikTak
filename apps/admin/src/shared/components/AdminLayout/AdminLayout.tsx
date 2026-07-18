import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../SideBar";
import { ADMIN_NAV } from "../../constants/nav.constant";

const { Sider, Content } = Layout;

const ADMIN_NAV: SidebarItem[] = [
  { key: "/campaigns", label: "Kampaniyalar" },
  { key: "/categories", label: "Kateqoriyalar" },
  { key: "/products", label: "Məhsullar" },
  { key: "/users", label: "İstifadəçilər" },
  { key: "/orders", label: "Sifarişlər" },
  { key: "logout", label: "Çıxış", isLogout: true },
];

interface AdminLayoutProps {
  logo?: string;
  onLogout?: () => void;
}

export default function AdminLayout({ logo, onLogout }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F6F5FB] flex items-center justify-center p-8">
      <div className="w-full max-w-[1600px] h-[calc(100vh-64px)] rounded-3xl overflow-hidden shadow-2xl relative">
        <Layout className="h-full">
          <Sider width={260} theme="light" className="!bg-white">
            <Sidebar items={ADMIN_NAV} logo={logo} onLogout={onLogout} />
          </Sider>

          <Layout>
            <Content className="p-8 bg-[#f7f8fa] overflow-auto h-full">
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </div>

    </div>
  );
}