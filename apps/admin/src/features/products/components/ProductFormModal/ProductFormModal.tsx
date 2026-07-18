import { Modal, Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";
import type { Product } from "../../../../shared/types/admin.types";

interface ProductFormModalProps {
  open: boolean;
  initialValues?: Product | null;
  onCancel: () => void;
  onSubmit: (values: Partial<Product>) => void;
}

export function ProductFormModal({
  open,
  initialValues,
  onCancel,
  onSubmit,
}: ProductFormModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues ?? {});
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    const values = await form.validateFields();
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title={initialValues ? "Məhsulu düzəlt" : "Yeni məhsul"}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Yadda saxla"
      cancelText="İmtina"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="baslik" label="Başlıq" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="kateqoriya"
          label="Kateqoriya"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="nov" label="Növ" rules={[{ required: true }]}>
          <Select
            options={[
              { value: "Fiziki", label: "Fiziki" },
              { value: "Rəqəmsal", label: "Rəqəmsal" },
            ]}
          />
        </Form.Item>
        <Form.Item name="qiymet" label="Qiymət" rules={[{ required: true }]}>
          <InputNumber className="w-full" min={0} addonAfter="₼" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
