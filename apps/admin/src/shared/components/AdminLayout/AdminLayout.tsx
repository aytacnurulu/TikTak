import { Layout } from "antd";
import Sidebar, { SidebarItem } from "../SideBar";

const { Sider, Header, Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
  logo?: string;
  onLogout?: () => void;
  // Qərar: header-də sabit axtarış input-u YOXDUR, çünki hər səhifədə
  // axtarış fərqli davranır (Kampaniyalarda ümumi axtarış, Kateqoriyalar/
  // Məhsullarda sütun-daxili axtarış, Sifarişlərdə heç yoxdur).
  // Bunun əvəzinə boş bir slot veririk — səhifə istəsə öz axtarışını/
  // filtr düymələrini buraya render edir, istəməsə heç nə göndərmir.
  headerExtra?: React.ReactNode;
}

export default function AdminLayout({
  children,
  sidebarItems,
  logo,
  onLogout,
  headerExtra,
}: AdminLayoutProps) {
  return (
    <Layout className="min-h-screen">
      <Sider
        width={260}
        theme="light"
        className="!bg-white border-r border-gray-100"
      >
        <Sidebar items={sidebarItems} logo={logo} onLogout={onLogout} />
      </Sider>

      <Layout>
        {headerExtra && (
          <Header className="!bg-white !h-16 !px-8 !leading-[64px] border-b border-gray-100 flex items-center justify-end">
            {headerExtra}
          </Header>
        )}

        <Content className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

// İstifadə nümunələri:
//
// 1) Axtarışı olan səhifə (Kampaniyalar):
// <AdminLayout sidebarItems={ADMIN_NAV} headerExtra={<Input.Search placeholder="Axtarış" style={{ width: 260 }} />}>
//   <CampaignsTable />
// </AdminLayout>
//
// 2) Axtarışı olmayan səhifə (Sifarişlər) — headerExtra verilmir, Header ümumiyyətlə render olunmur:
// <AdminLayout sidebarItems={ADMIN_NAV}>
//   <OrdersTable />
// </AdminLayout>
