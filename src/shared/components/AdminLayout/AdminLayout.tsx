import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../SideBar";
import Navbar from "../Navbar/Navbar";
import { ADMIN_NAV } from "../../constants/nav.constant";

interface AdminLayoutProps {
  logo?: string;
}

export default function AdminLayout({ logo }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentSearch = searchParams.get("search") ?? "";

  function handleSearch(value: string) {
    const nextParams = new URLSearchParams(location.search);
    if (value.trim()) {
      nextParams.set("search", value.trim());
    } else {
      nextParams.delete("search");
    }

    navigate(
      { pathname: location.pathname, search: nextParams.toString() },
      { replace: true },
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F5FB] flex flex-col">
      <Navbar value={currentSearch} onSearch={handleSearch} />

      <div className="flex-1 flex justify-center px-8 pb-8 pt-20 overflow-hidden">
        <div className="w-full max-w-[1600px] flex gap-5">
          <aside className="w-[260px] shrink-0 bg-white rounded-[10px] shadow-sm overflow-hidden">
            <Sidebar items={ADMIN_NAV} logo={logo} />
          </aside>

          <main className="flex-1 bg-white rounded-[10px] shadow-sm overflow-hidden">
            <div className="h-full overflow-auto p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
