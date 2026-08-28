import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { Select } from "antd";
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
import { useGetProducts } from "../hooks/useGetProducts";
import { useCreateProduct } from "../hooks/usePostProduct";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { usePutProduct } from "../hooks/usePutProduct";
import { useGetCategories } from "../../categories/hooks/useGetCategories";
import { uploadImage } from "../../../shared/lib/upload";
import { notifyError } from "../../../shared/lib/notify";

import {
  ProductMeasure,
  type Product,
  type ProductCreateRequest,
} from "../../../shared/types/admin.types";

interface ProductFormState {
  title: string;
  description: string;
  img_url: string;
  category_id: number | null;
  type: ProductMeasure | null;
  price: string;
}

const EMPTY_FORM: ProductFormState = {
  title: "",
  description: "",
  img_url: "",
  category_id: null,
  type: null,
  price: "",
};

const MEASURE_OPTIONS = Object.values(ProductMeasure).map((m) => ({
  value: m,
  label: m,
}));

// Növ sütununda göstərilən Azərbaycanca etiketlər
const MEASURE_LABELS: Record<ProductMeasure, string> = {
  [ProductMeasure.KG]: "Kiloqram",
  [ProductMeasure.GR]: "Qram",
  [ProductMeasure.LITRE]: "Litr",
  [ProductMeasure.ML]: "Mililitr",
  [ProductMeasure.METER]: "Metr",
  [ProductMeasure.CM]: "Santimetr",
  [ProductMeasure.MM]: "Millimetr",
  [ProductMeasure.PIECE]: "Ədəd",
  [ProductMeasure.PACKET]: "Paket",
  [ProductMeasure.BOX]: "Qutu",
};

const MEASURE_COLORS = "text-purple-600";

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.trim() ?? "";
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductFormState>(EMPTY_FORM);
  const [imageError, setImageError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // ---------- Data ----------
  const { data, isLoading } = useGetProducts({ page, limit: pageSize, search });
  const { data: categoriesData } = useGetCategories();
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = usePutProduct();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const products: Product[] = Array.isArray(data?.data)
    ? data.data
    : Array.isArray((data as any)?.products)
      ? (data as any).products
      : [];
  const total = data?.pagination?.total ?? (data as any)?.total ?? 0;

  useEffect(() => {
    setPage(1);
  }, [search]);
  const categories = categoriesData?.data ?? [];

  // ---------- Handlers: create/edit modal ----------
  function handleOpenCreate() {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setImageError("");
    setIsFormOpen(true);
  }

  function handleOpenEdit(product: Product) {
    setEditingProduct(product);
    setForm({
      title: product.title,
      description: product.description,
      img_url: product.img_url,
      category_id: product.category.id,
      type: product.type,
      price: product.price,
    });
    setImageError("");
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingProduct(null);
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
    if (!form.category_id || !form.type) return;

    const payload: ProductCreateRequest = {
      title: form.title,
      description: form.description,
      img_url: form.img_url,
      category_id: form.category_id as number,
      type: form.type as ProductMeasure,
      price: form.price,
    };

    if (editingProduct) {
      updateProduct(
        { id: editingProduct.id, payload: payload as any },
        { onSuccess: handleCloseForm },
      );
    } else {
      createProduct(payload as any, { onSuccess: handleCloseForm });
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
    deleteProduct({ id: deletingId }, { onSuccess: handleCloseDelete });
  }

  // ---------- Table columns ----------
  const columns: ColumnsType<Product> = [
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
          alt={record.title}
          className="w-12 h-12 rounded-lg object-cover"
        />
      ),
    },
    {
      title: "Ad",
      dataIndex: "title",
      key: "title",
      render: (title: string) => (
        <TableCell className="font-semibold">{title}</TableCell>
      ),
    },
    {
      title: "Açıqlama",
      dataIndex: "description",
      key: "description",
      render: (description: string) => (
        <TableCell className="text-gray-500 line-clamp-2">
          {description || "-"}
        </TableCell>
      ),
    },
    {
      title: "Qiymət",
      dataIndex: "price",
      key: "price",
      width: 110,
      sorter: (a, b) => Number(a.price) - Number(b.price),
      render: (price: string) => (
        <TableCell className="font-semibold">
          {Number(price).toFixed(2)} ₼
        </TableCell>
      ),
    },
    {
      title: "Kateqoriya",
      dataIndex: "category",
      key: "category",
      render: (category: Product["category"]) => (
        <TableCell className="text-gray-500">{category?.name ?? "-"}</TableCell>
      ),
    },
    {
      title: "Növ",
      dataIndex: "type",
      key: "type",
      filters: MEASURE_OPTIONS.map(({ value, label }) => ({
        text: MEASURE_LABELS[label] ?? label,
        value,
      })),
      onFilter: (value, record) => record.type === value,
      render: (type: ProductMeasure) => (
        <TableCell className={`font-medium ${MEASURE_COLORS}`}>
          {MEASURE_LABELS[type] ?? type}
        </TableCell>
      ),
    },
    {
      title: "Tarix",
      dataIndex: "created_at",
      key: "created_at",
      width: 130,
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      filters: Array.from(
        new Set(products.map((product) => formatDate(product.created_at))),
      ).map((date) => ({ text: date, value: date })),
      onFilter: (value, record) => formatDate(record.created_at) === value,
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
        <h1 className="text-2xl font-bold text-gray-900">Məhsullar</h1>
        <AppButton variant="primary" onClick={handleOpenCreate}>
          + Yeni Məhsul
        </AppButton>
      </div>

      <DataTable<Product>
        columns={columns}
        dataSource={products}
        loading={isLoading}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      <FormModal
        open={isFormOpen}
        title={editingProduct ? "Məhsulu Düzəlt" : "Yeni Məhsul"}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        width={560}
        contentClassName="max-h-[70vh] overflow-y-auto pr-1"
        submitText={
          isUploading
            ? "Şəkil yüklənir..."
            : editingProduct
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
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="Məhsul adı"
        />
        <AppTextArea
          label="Açıqlama"
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          placeholder="Məhsul açıqlaması"
        />

        <div className="mb-4">
          <div className="mb-1 text-sm text-gray-500">Məhsul şəkli</div>
          <div className="flex items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white text-gray-400">
              {form.img_url ? (
                <img
                  src={form.img_url}
                  alt="Məhsul önizləməsi"
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

        <div>
          <label className="block text-sm font-medium mb-1">Kateqoriya</label>
          <Select
            className="w-full"
            value={form.category_id ?? undefined}
            onChange={(value) => setForm((f) => ({ ...f, category_id: value }))}
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
            placeholder="Kateqoriya seçin"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ölçü vahidi</label>
          <Select
            className="w-full"
            value={form.type ?? undefined}
            onChange={(value) => setForm((f) => ({ ...f, type: value }))}
            options={MEASURE_OPTIONS}
            placeholder="Ölçü vahidi seçin"
          />
        </div>

        <AppInput
          label="Qiymət"
          type="number"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          placeholder="0.00"
        />
      </FormModal>

      <ConfirmModal
        open={isConfirmOpen}
        title="Məhsulu silməyə əminsinizmi?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDelete}
        confirmText={isDeleting ? "Silinir..." : "Təsdiqlə"}
      />
    </div>
  );
}

export default ProductsPage;
