import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { FiImage, FiUpload, FiX } from "react-icons/fi";
import {
  DataTable,
  TableActions,
  TableCell,
} from "../../../shared/components/DataTable";
import AppButton from "../../../shared/components/AppButton";
import { AppInput, AppTextArea } from "../../../shared/components/AppInput";
import ConfirmModal from "../../../shared/components/ConfirmModal";
import FormModal from "../../../shared/components/FormModal";
import formatDate from "../utils/formatDate";
import { useGetCategories } from "../hooks/useGetCategories";
import { useCreateCategory } from "../hooks/usePostCategories";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import { usePutCategory } from "../hooks/usePutCategory";
import { uploadImage } from "../../../shared/lib/upload";
import { notifyError } from "../../../shared/lib/notify";

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
  const [imageError, setImageError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
    setImageError("");
    setIsFormOpen(true);
  }

  function handleOpenEdit(category: Category) {
    setEditingCategory(category);
    setForm({
      name: category.name,
      description: category.description,
      img_url: category.img_url,
    });
    setImageError("");
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingCategory(null);
    setForm(EMPTY_FORM);
    setImageError("");
    if (imageInputRef.current) imageInputRef.current.value = "";
  }

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Yalnız şəkil faylı seçə bilərsiniz.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Şəklin ölçüsü 5 MB-dan çox olmamalıdır.");
      return;
    }

    // Faylı serverə yükləyib, qaytarılan URL-i saxlayırıq.
    // Backend `img_url` sahəsində base64 data URI deyil, həqiqi URL gözləyir.
    setImageError("");
    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((current) => ({ ...current, img_url: url }));
    } catch {
      notifyError("Şəkil yüklənərkən xəta baş verdi");
      if (imageInputRef.current) imageInputRef.current.value = "";
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemoveImage() {
    setForm((current) => ({ ...current, img_url: "" }));
    setImageError("");
    if (imageInputRef.current) imageInputRef.current.value = "";
  }

  function handleSubmitForm() {
    if (isUploading) return;
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
      render: (_value, _record, index) => (
        <TableCell className="font-medium">
          {(page - 1) * pageSize + index + 1}
        </TableCell>
      ),
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
      render: (name: string) => (
        <TableCell className="font-semibold">{name}</TableCell>
      ),
    },
    {
      title: "Açıqlama",
      dataIndex: "description",
      key: "description",
      render: (description: string) => (
        <TableCell className="text-gray-500">{description}</TableCell>
      ),
    },
    {
      title: "Tarix",
      dataIndex: "created_at",
      key: "created_at",
      width: 130,
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      render: (created_at: string) => (
        <TableCell className="font-medium">{formatDate(created_at)}</TableCell>
      ),
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
      <div className="flex justify-between items-center h-11 pb-4 mb-6 border-b border-gray-100">
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
        width={560}
        contentClassName="max-h-[70vh] overflow-y-auto pr-1"
        submitText={
          isUploading
            ? "Şəkil yüklənir..."
            : editingCategory
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
        <div className="mb-4">
          <div className="mb-1 text-sm text-gray-500">Kateqoriya şəkli</div>
          <div className="flex items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white text-gray-400">
              {form.img_url ? (
                <img
                  src={form.img_url}
                  alt="Kateqoriya önizləməsi"
                  className="h-full w-full object-cover"
                />
              ) : (
                <FiImage size={24} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-700">
                {form.img_url ? "Şəkil hazırdır" : "Kompüterdən şəkil seçin"}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                JPG, PNG və ya WEBP · maksimum 5 MB
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-gray-700"
                >
                  <FiUpload size={14} />
                  {form.img_url ? "Dəyişdir" : "Şəkil seç"}
                </button>
                {form.img_url && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
                  >
                    <FiX size={14} />
                    Sil
                  </button>
                )}
              </div>
            </div>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          {imageError && (
            <p className="mt-1 text-xs text-red-500">{imageError}</p>
          )}
        </div>
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
