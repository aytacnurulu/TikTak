import { Modal } from "antd";
import AppButton from "@/shared/components/AppButton";
import deleteIllustration from "@/assets/images/DeleteModatimg.svg"; // öz fayl adınızla əvəz edin

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

// Skrinşotdakı "Məlumatı silməyə əminsinizmi?" modalı — Kampaniyalar,
// Kateqoriyalar, Məhsullar, İstifadəçilər hamısında eyni komponentdən
// istifadə edə bilər, yalnız `title` və `onConfirm` fərqlənir.
export default function ConfirmModal({
  open,
  title = "Məlumatı silməyə əminsinizmi?",
  onConfirm,
  onCancel,
  confirmText = "Təsdiqlə",
  cancelText = "İndi yox",
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={380}
      closable={false}
      className="[&_.ant-modal-content]:rounded-3xl [&_.ant-modal-content]:p-8"
    >
      <div className="flex flex-col items-center text-center">
        <img
          src={deleteIllustration}
          alt="Silmə təsdiqi"
          className="w-40 h-40 object-contain mb-2"
        />

        <p className="mb-6 font-medium text-gray-800 text-base">{title}</p>

        <div className="flex gap-3 w-full">
          <AppButton
            variant="primary"
            className="flex-1 !bg-[#7ED957] !border-none rounded-full h-11 font-semibold"
            onClick={onConfirm}
          >
            {confirmText}
          </AppButton>

          <AppButton
            variant="outline"
            className="flex-1 !text-gray-400 !border-gray-200 rounded-full h-11 font-medium"
            onClick={onCancel}
          >
            {cancelText}
          </AppButton>
        </div>
      </div>
    </Modal>
  );
}