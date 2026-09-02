import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { FiImage, FiUpload, FiX } from "react-icons/fi";
import {
  DataTable,
  TableActions,
  TableCell,
} from "@/shared/components/DataTable";
import AppButton from "@/shared/components/AppButton";
import { AppInput, AppTextArea } from "@/shared/components/AppInput";
import ConfirmModal from "@/shared/components/ConfirmModal";
import FormModal from "@/shared/components/FormModal";
import formatDate from "@/features/campaigns/utils/formatDate";
import { useGetCampaigns } from "@/features/campaigns/hooks/useGetCampaigns";
import { useCreateCampaign } from "@/features/campaigns/hooks/usePostCampaigns";
import { useDeleteCampaign } from "@/features/campaigns/hooks/useDeleteCampaign";
import { usePutCampaign } from "@/features/campaigns/hooks/usePutCampaign";
import { uploadImage } from "@/shared/lib/upload";
import { notifyError } from "@/shared/lib/notify";

import type { Campaign } from "@/shared/types/admin.types";

// Forma state-i üçün lokal tip: yaradanda da, redaktə edəndə də
// eyni sahələr istifadə olunur (title, description, img_url)
interface CampaignFormState {
  title: string;
  description: string;
  img_url: string;
}

const EMPTY_FORM: CampaignFormState = {
  title: "",
  description: "",
  img_url: "",
};

function CampaignsPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // ---------- Modal state ----------
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [form, setForm] = useState<CampaignFormState>(EMPTY_FORM);
  const [imageError, setImageError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // ---------- Data ----------
  const { data, isLoading } = useGetCampaigns();
  const { mutate: createCampaign, isPending: isCreating } = useCreateCampaign();
  const { mutate: updateCampaign, isPending: isUpdating } = usePutCampaign();
  const { mutate: deleteCampaign, isPending: isDeleting } = useDeleteCampaign();

  const campaigns: Campaign[] = data?.data ?? [];

  const filteredCampaigns = useMemo(() => {
    if (!search) return campaigns;
    return campaigns.filter((campaign) =>
      [campaign.title, campaign.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search),
    );
  }, [campaigns, search]);

  const paginatedCampaigns = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCampaigns.slice(start, start + pageSize);
  }, [filteredCampaigns, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  // ---------- Handlers: create/edit modal açılışı ----------
  function handleOpenCreate() {
    setEditingCampaign(null);
    setForm(EMPTY_FORM);
    setImageError("");
    setIsFormOpen(true);
  }

  function handleOpenEdit(campaign: Campaign) {
    setEditingCampaign(campaign);
    setForm({
      title: campaign.title,
      description: campaign.description ?? "",
      img_url: campaign.img_url ?? "",
    });
    setImageError("");
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingCampaign(null);
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
    if (editingCampaign) {
      updateCampaign(
        {
          id: editingCampaign.id,
          payload: {
            title: form.title,
            description: form.description,
            img_url: form.img_url,
          },
        },
        { onSuccess: handleCloseForm },
      );
    } else {
      createCampaign(
        {
          title: form.title,
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
    deleteCampaign(
      { id: deletingId },
      {
        onSuccess: handleCloseDelete,
      },
    );
  }

  // ---------- Table columns ----------
  const columns: ColumnsType<Campaign> = [
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
        <h1 className="text-2xl font-bold text-gray-900">Kampaniyalar</h1>
        <AppButton variant="primary" onClick={handleOpenCreate}>
          + Yeni Kampaniya
        </AppButton>
      </div>

      <DataTable<Campaign>
        columns={columns}
        dataSource={paginatedCampaigns}
        loading={isLoading}
        page={page}
        pageSize={pageSize}
        total={filteredCampaigns.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      <FormModal
        open={isFormOpen}
        title={editingCampaign ? "Kampaniyanı Düzəlt" : "Yeni Kampaniya"}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        width={560}
        contentClassName="max-h-[70vh] overflow-y-auto pr-1"
        submitText={
          isUploading
            ? "Şəkil yüklənir..."
            : editingCampaign
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
          placeholder="Kampaniya adı"
        />
        <AppTextArea
          label="Açıqlama"
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          placeholder="Kampaniya açıqlaması"
        />
        <div className="mb-4">
          <div className="mb-1 text-sm text-gray-500">Kampaniya şəkli</div>
          <div className="flex items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white text-gray-400">
              {form.img_url ? (
                <img
                  src={form.img_url}
                  alt="Kampaniya önizləməsi"
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
        title="Kampaniyanı silməyə əminsinizmi?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDelete}
        confirmText={isDeleting ? "Silinir..." : "Təsdiqlə"}
      />
    </div>
  );
}

export default CampaignsPage;
