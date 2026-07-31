import { Tag } from 'antd';

// Skrinşotlarda 3 fərqli yerdə rəngli etiket görünür:
// - Sifariş statusu: Gözləyir / Təsdiqləndi / Çatdırıldı / Ləğv edilən
// - İstifadəçi rolu: COMMERCE
// - Məhsul növü: Kiloqram / Ədəd
// Hamısı eyni "mətn → rəng" xəritəsi məntiqi ilə işləyir.
const COLOR_MAP: Record<string, string> = {
  'Gözləyir': 'gold',
  'Təsdiqləndi': 'blue',
  'Çatdırıldı': 'green',
  'Ləğv edildi': 'red',
  'COMMERCE': 'green',
  'Kiloqram': 'purple',
  'Ədəd': 'purple',
};

export default function StatusTag({ value }: { value: string }) {
  return <Tag color={COLOR_MAP[value] ?? 'default'}>{value}</Tag>;
}