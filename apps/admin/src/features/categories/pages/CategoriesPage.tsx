import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { DataTable, TableActions } from "../../../shared/components/DataTable";
import AppButton from "../../../shared/components/AppButton";
import { AppInput, AppTextArea } from "../../../shared/components/AppInput";
import ConfirmModal from "../../../shared/components/ConfirmModal";
import FormModal from "../../../shared/components/FormModal";
import formatDate from "../utils/formatDate";
import { useGetCategories } from "../hooks/useGetCategories";
import { useCreateCategory } from "../hooks/usePostCategories";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import { usePutCategory } from "../hooks/usePutCategory";

import type { Category } from "../../../shared/types/admin.types";

// Forma state-i üçün lokal tip: yaradanda da, redaktə edəndə də
// eyni sahələr istifadə olunur (name, description, img_url)
interface CategoryFormState {
  name: string;
  description: string;
  img_url: string;
}

const EMPTY_FORM: CategoryFormState = {
  name: "",
  description: "",
  img_url: "",
};

function CategoriesPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // ---------- Modal state ----------
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [form, setForm] = useState<CategoryFormState>(EMPTY_FORM);

  // ---------- Data ----------
  const { data, isLoading } = useGetCategories();
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = usePutCategory();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  const categories: Category[] = data?.data ?? [];

  const filteredCategories = useMemo(() => {
    if (!search) return categories;
    return categories.filter((category) =>
      [category.name, category.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search),
    );
  }, [categories, search]);

  const paginatedCategories = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCategories.slice(start, start + pageSize);
  }, [filteredCategories, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  // ---------- Handlers: create/edit modal açılışı ----------
  function handleOpenCreate() {
    setEditingCategory(null);
    setForm(EMPTY_FORM);
    setIsFormOpen(true);
  }

  function handleOpenEdit(category: Category) {
    setEditingCategory(category);
    setForm({
      name: category.name,
      description: category.description,
      img_url: category.img_url,
    });
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingCategory(null);
    setForm(EMPTY_FORM);
  }

  function handleSubmitForm() {
    if (editingCategory) {
      updateCategory(
        {
          id: editingCategory.id,
          payload: {
            name: form.name,
            description: form.description,
            img_url: form.img_url,
          },
        },
        { onSuccess: handleCloseForm },
      );
    } else {
      createCategory(
        {
          name: form.name,
          description: form.description,
          img_url: form.img_url,
        },
        { onSuccess: handleCloseForm },
      );
    }
  }

  // ---------- Handlers: delete ----------
  function handleOpenDelete(id: number) {
    setDeletingId(id);
    setIsConfirmOpen(true);
  }

  function handleCloseDelete() {
    setIsConfirmOpen(false);
    setDeletingId(null);
  }

  function handleConfirmDelete() {
    if (deletingId == null) return;
    deleteCategory(
      { id: deletingId },
      {
        onSuccess: handleCloseDelete,
      },
    );
  }

  // ---------- Table columns ----------
  const columns: ColumnsType<Category> = [
    {
      title: "Sıra",
      key: "index",
      width: 70,
      render: (_value, _record, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: "Şəkil",
      dataIndex: "img_url",
      key: "img_url",
      width: 90,
      render: (img_url: string, record) => (
        <img
          src={img_url}
          alt={record.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
      ),
    },
    {
      title: "Ad",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <span className="font-semibold">{name}</span>,
    },
    {
      title: "Açıqlama",
      dataIndex: "description",
      key: "description",
      render: (description: string) => (
        <span className="text-gray-500">{description}</span>
      ),
    },
    {
      title: "Tarix",
      dataIndex: "created_at",
      key: "created_at",
      width: 130,
      render: (created_at: string) => formatDate(created_at),
    },
    {
      title: "Əməliyyat",
      key: "actions",
      width: 160,
      render: (_value, record) => (
        <TableActions
          onEdit={() => handleOpenEdit(record)}
          onDelete={() => handleOpenDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kateqoriyalar</h1>
        <AppButton variant="primary" onClick={handleOpenCreate}>
          + Yeni Kateqoriya
        </AppButton>
      </div>

      <DataTable<Category>
        columns={columns}
        dataSource={paginatedCategories}
        loading={isLoading}
        page={page}
        pageSize={pageSize}
        total={filteredCategories.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      <FormModal
        open={isFormOpen}
        title={editingCategory ? "Kateqoriyanı Düzəlt" : "Yeni Kateqoriya"}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        submitText={
          editingCategory
            ? isUpdating
              ? "Yenilənir..."
              : "Yadda saxla"
            : isCreating
              ? "Yaradılır..."
              : "Məlumatları yarat"
        }
      >
        <AppInput
          label="Ad"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Kateqoriya adı"
        />
        <AppTextArea
          label="Açıqlama"
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          placeholder="Kateqoriya açıqlaması"
        />
        <AppInput
          label="Şəkil URL"
          value={form.img_url}
          onChange={(e) => setForm((f) => ({ ...f, img_url: e.target.value }))}
          placeholder="https://..."
        />
      </FormModal>

      <ConfirmModal
        open={isConfirmOpen}
        title="Kateqoriyanı silməyə əminsinizmi?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDelete}
        confirmText={isDeleting ? "Silinir..." : "Təsdiqlə"}
      />
    </div>
  );
}

export default CategoriesPage;
