import { Button, ButtonProps } from 'antd';

type Variant = 'primary' | 'outline' | 'danger';

interface AppButtonProps extends Omit<ButtonProps, 'type'> {
  variant?: Variant;
}

// Skrinşotlarda görünən 3 buton stili: yaşıl dolu ("Daxil ol", "Əlavə et",
// "Təsdiqlə", "Məlumatları yarat"), boz outline ("İmtina"), və lazım olarsa
// qırmızı (destructive əməliyyatlar üçün).
const VARIANT_STYLES: Record<Variant, string> = {
  primary: '!bg-[#A3D977] hover:!bg-[#8FCB5E] !border-none !text-white',
  outline: '!bg-transparent !border-gray-300 !text-gray-600 hover:!border-gray-400',
  danger: '!bg-red-500 hover:!bg-red-600 !border-none !text-white',
};

export default function AppButton({
  variant = 'primary',
  className = '',
  ...rest
}: AppButtonProps) {
  return (
    <Button
      className={`!rounded-lg !h-11 !font-medium !px-6 ${VARIANT_STYLES[variant]} ${className}`}
      {...rest}
    />
  );
}