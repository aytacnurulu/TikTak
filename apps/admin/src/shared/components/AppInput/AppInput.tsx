import { Input, InputProps } from 'antd';
import { TextAreaProps } from 'antd/es/input';

interface FieldWrapperProps {
  label?: string;
}

// Login (Telefon/Parol) və forma modallarında (Başlıq/Açıqlama) eyni
// vizual dil təkrarlanır: açıq boz fon, label yuxarıda, rounded kənarlar.
// Üç variant bir yerdə saxlanılır ki, import zamanı hamısı bir yerdən gəlsin.

export function AppInput({ label, ...rest }: FieldWrapperProps & InputProps) {
  return (
    <div className="mb-4">
      {label && <div className="mb-1 text-sm text-gray-500">{label}</div>}
      <Input className="!bg-gray-50 !rounded-lg !h-11 !border-gray-200" {...rest} />
    </div>
  );
}

export function AppPassword({ label, ...rest }: FieldWrapperProps & InputProps) {
  return (
    <div className="mb-4">
      {label && <div className="mb-1 text-sm text-gray-500">{label}</div>}
      <Input.Password className="!bg-gray-50 !rounded-lg !h-11 !border-gray-200" {...rest} />
    </div>
  );
}

export function AppTextArea({ label, ...rest }: FieldWrapperProps & TextAreaProps) {
  return (
    <div className="mb-4">
      {label && <div className="mb-1 text-sm text-gray-500">{label}</div>}
      <Input.TextArea rows={4} className="!bg-gray-50 !rounded-lg !border-gray-200" {...rest} />
    </div>
  );
}