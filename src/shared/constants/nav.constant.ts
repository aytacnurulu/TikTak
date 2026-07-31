import type { SidebarItem } from "../components/SideBar";

export const ADMIN_NAV: SidebarItem[] = [
  { key: "/orders", label: "Sifarişlər" },
  { key: "/campaigns", label: "Kampaniyalar" },
  { key: "/categories", label: "Kateqoriyalar" },
  { key: "/products", label: "Məhsullar" },
  { key: "/users", label: "İstifadəçilər" },
  { key: "logout", label: "Çıxış", isLogout: true },
];