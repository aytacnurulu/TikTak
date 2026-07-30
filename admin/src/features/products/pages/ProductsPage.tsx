import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { Select } from "antd";
import { DataTable, TableActions } from "../../../shared/components/DataTable";
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

  // ---------- Data ----------
  const { data, isLoading } = useGetProducts({ page, limit: pageSize, search });
  const { data: categoriesData } = useGetCategories();
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = usePutProduct();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const products = Array.isArray(data?.data)
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
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingProduct(null);
    setForm(EMPTY_FORM);
  }

  function handleSubmitForm() {
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
          alt={record.title}
          className="w-12 h-12 rounded-lg object-cover"
        />
      ),
    },
    {
      title: "Ad",
      dataIndex: "title",
      key: "title",
      render: (title: string) => <span className="font-semibold">{title}</span>,
    },
    {
      title: "Kateqoriya",
      dataIndex: "category",
      key: "category",
      render: (category: Product["category"]) => (
        <span className="text-gray-500">{category?.name ?? "-"}</span>
      ),
    },
    {
      title: "Növ",
      dataIndex: "type",
      key: "type",
      render: (type: ProductMeasure) => (
        <span className="text-gray-500">{type}</span>
      ),
    },
    {
      title: "Qiymət",
      dataIndex: "price",
      key: "price",
      width: 110,
      render: (price: string) => (
        <span className="font-semibold">{Number(price).toFixed(2)} ₼</span>
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
        submitText={
          editingProduct
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
        <AppInput
          label="Şəkil URL"
          value={form.img_url}
          onChange={(e) => setForm((f) => ({ ...f, img_url: e.target.value }))}
          placeholder="https://..."
        />

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
