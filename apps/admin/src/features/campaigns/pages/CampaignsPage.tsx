import { useMemo, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { DataTable, TableActions } from "../../../shared/components/DataTable";
import AppButton from "../../../shared/components/AppButton";
import { AppInput, AppTextArea } from "../../../shared/components/AppInput";
import ConfirmModal from "../../../shared/components/ConfirmModal";
import FormModal from "../../../shared/components/FormModal";
import formatDate from "../utils/formatDate";
import { useGetCampaigns } from "../hooks/useGetCampaigns";
import { useCreateCampaign } from "../hooks/usePostCampaigns";
import { useDeleteCampaign } from "../hooks/useDeleteCampaign";
import { usePutCampaign } from "../hooks/usePutCampaign";

import type { Campaign } from "../../../shared/types/admin.types";

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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // ---------- Modal state ----------
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [form, setForm] = useState<CampaignFormState>(EMPTY_FORM);

  // ---------- Data ----------
  const { data, isLoading } = useGetCampaigns();
  const { mutate: createCampaign, isPending: isCreating } = useCreateCampaign();
  const { mutate: updateCampaign, isPending: isUpdating } = usePutCampaign();
  const { mutate: deleteCampaign, isPending: isDeleting } = useDeleteCampaign();

  const campaigns: Campaign[] = data?.data ?? [];

  const paginatedCampaigns = useMemo(() => {
    const start = (page - 1) * pageSize;
    return campaigns.slice(start, start + pageSize);
  }, [campaigns, page, pageSize]);

  // ---------- Handlers: create/edit modal açılışı ----------
  function handleOpenCreate() {
    setEditingCampaign(null);
    setForm(EMPTY_FORM);
    setIsFormOpen(true);
  }

  function handleOpenEdit(campaign: Campaign) {
    setEditingCampaign(campaign);
    setForm({
      title: campaign.title,
      description: campaign.description ?? "",
      img_url: campaign.img_url ?? "",
    });
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingCampaign(null);
    setForm(EMPTY_FORM);
  }

  function handleSubmitForm() {
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
        total={campaigns.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      <FormModal
        open={isFormOpen}
        title={editingCampaign ? "Kampaniyanı Düzəlt" : "Yeni Kampaniya"}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        submitText={
          editingCampaign
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
        <AppInput
          label="Şəkil URL"
          value={form.img_url}
          onChange={(e) => setForm((f) => ({ ...f, img_url: e.target.value }))}
          placeholder="https://..."
        />
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
