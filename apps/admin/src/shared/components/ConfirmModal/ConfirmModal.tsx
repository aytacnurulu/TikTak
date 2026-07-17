import { Modal } from "antd";
import AppButton from "./AppButton";

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
  cancelText = "İmtina",
}: ConfirmModalProps) {
  return (
    <Modal open={open} onCancel={onCancel} footer={null} centered width={380}>
      <div className="flex flex-col items-center text-center py-4">
        <p className="mb-6 font-medium text-gray-800">{title}</p>
        <div className="flex gap-3 w-full">
          <AppButton variant="primary" className="flex-1" onClick={onConfirm}>
            {confirmText}
          </AppButton>
          <AppButton variant="outline" className="flex-1" onClick={onCancel}>
            {cancelText}
          </AppButton>
        </div>
      </div>
    </Modal>
  );
}
