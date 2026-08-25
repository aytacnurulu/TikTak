import { Modal } from "antd";
import AppButton from "../AppButton";

interface FormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  submitText?: string;
  width?: number;
  contentClassName?: string;
  children: React.ReactNode;
}

// "Yeni Kampaniya" / "Yeni Kateqoriya" / "Yeni Məhsul" modallarının hamısı
// eyni qəlibdə qurulub: başlıq + sahələr + tək yaşıl submit düyməsi.
// Sahələr (şəkil upload, input, textarea) hər səhifədə fərqli olduğu üçün
// FormModal onları children kimi qəbul edir, özü submit məntiqini idarə edir.
export default function FormModal({
  open,
  title,
  onClose,
  onSubmit,
  submitText = "Məlumatları yarat",
  width = 520,
  contentClassName = "",
  children,
}: FormModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={title}
      width={width}
      centered
    >
      <div className={`pt-2 ${contentClassName}`}>
        {children}
        <AppButton variant="primary" block onClick={onSubmit}>
          {submitText}
        </AppButton>
      </div>
    </Modal>
  );
}
