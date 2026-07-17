import { useState } from "react";
import AdminLayout from "../../../shared/components/AdminLayout";
import { DataTable } from "../../../shared/components/DataTable";
import type { TableActions } from "../../../shared/components/DataTable";
import AppButton from "../../../shared/components/AppButton";
import { AppInput, AppTextArea } from "../../../shared/components/AppInput";
import ConfirmModal from "../../../shared/components/ConfirmModal";
import FormModal from "../../../shared/components/FormModal";
import type { SidebarItem } from "../../../shared/components/SideBar";

const ADMIN_NAV: SidebarItem[] = [
  { key: "/campaigns", label: "Kampaniyalar" },
  { key: "/categories", label: "Kateqoriyalar" },
  { key: "/products", label: "Məhsullar" },
  { key: "/users", label: "İstifadəçilər" },
  { key: "/orders", label: "Sifarişlər" },
  { key: "logout", label: "Çıxış", isLogout: true },
];

interface Category {
  id: number;
  name: string;
  description: string;
  date: string;
}

const MOCK_DATA: Category[] = [
  {
    id: 1,
    name: "Meyveler ve terevezler",
    description: "meyvelerr vee terevezleer",
    date: "31.07.2025",
  },
  {
    id: 2,
    name: "Spor ve Aciq Hava",
    description: "Idman ekipmanlari...",
    date: "30.07.2025",
  },
];

// Bu səhifə Kateqoriyalar skrinşotunu (image 4) əsas alaraq shared
// komponentlərin necə birləşdiyini göstərir. Diqqət et: headerExtra
// verilmir — bu səhifədə ümumi axtarış yoxdur, əvəzinə sütun-daxili
// axtarış lazımdır (bunu Table-ın öz filterDropdown-u ilə əlavə edərsən).
export default function CategoriesExample() {
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <AdminLayout sidebarItems={ADMIN_NAV}>
      <div className="bg-white rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Kateqoriyalar</h1>
          <AppButton onClick={() => setIsFormOpen(true)}>
            + Yeni Kateqoriya
          </AppButton>
        </div>

        <DataTable<Category>
          dataSource={MOCK_DATA}
          columns={[
            { title: "Ad", dataIndex: "name" },
            { title: "Açıqlama", dataIndex: "description" },
            { title: "Tarix", dataIndex: "date" },
            {
              title: "Əməliyyat",
              render: (_, record) => (
                <TableActions
                  onEdit={() => console.log("edit", record.id)}
                  onDelete={() => setDeleteTarget(record)}
                />
              ),
            },
          ]}
        />
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        onConfirm={() => setDeleteTarget(null)}
        onCancel={() => setDeleteTarget(null)}
      />

      <FormModal
        open={isFormOpen}
        title="Yeni Kateqoriya"
        onClose={() => setIsFormOpen(false)}
        onSubmit={() => setIsFormOpen(false)}
        submitText="Məlumatları yarat"
      >
        <AppInput label="Başlıq" placeholder="Kateqoriya adı" />
        <AppTextArea label="Açıqlama" placeholder="Qısa açıqlama" />
      </FormModal>
    </AdminLayout>
  );
}
