import { useState } from "react";
import AdminLayout from "../../../shared/components/AdminLayout";
import { DataTable } from "../../../shared/components/DataTable";
import type { TableActions } from "../../../shared/components/DataTable";
import AppButton from "../../../shared/components/AppButton";
import { AppInput, AppTextArea } from "../../../shared/components/AppInput";
import ConfirmModal from "../../../shared/components/ConfirmModal";
import FormModal from "../../../shared/components/FormModal";
import type { SidebarItem } from "../../../shared/components/SideBar";
import {
  useGetCategories,
  useCreateCategory,
  useDeleteCategory,
  usePutCategory,
} from "../hooks/category.hooks";

const ADMIN_NAV: SidebarItem[] = [
  { key: "/campaigns", label: "Kampaniyalar" },
  { key: "/categories", label: "Kateqoriyalar" },
  { key: "/products", label: "Məhsullar" },
  { key: "/users", label: "İstifadəçilər" },
  { key: "/orders", label: "Sifarişlər" },
  { key: "logout", label: "Çıxış", isLogout: true },
];

function CategoriesPage() {
  return (
    <AdminLayout
      sidebarItems={ADMIN_NAV}
      logo="Tik tak admin app"
      headerExtra="Katiqoriyalar"
    >
      <DataTable></DataTable>
    </AdminLayout>
  );
}

export default CategoriesPage;
