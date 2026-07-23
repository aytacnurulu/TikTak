import Image, { StaticImageData } from 'next/image';
import Card from '@/shared/components/Card';

interface InfoCardProps {
  image: string | StaticImageData;
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function InfoCard({
  image,
  label,
  onClick,
  className = '',
}: InfoCardProps) {
  return (
    <Card
      onClick={onClick}
      role={onClick ? 'button' : 'listitem'}
      tabIndex={onClick ? 0 : undefined}
      className={`flex flex-col items-center justify-center gap-2 p-4 w-full aspect-square transition-shadow hover:shadow-md ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="relative w-24 h-24">
        <Image src={image} alt={label} fill className="object-contain" />
      </div>
      <span className="text-xl font-medium text-gray-800 text-center">
        {label}
      </span>
    </Card>
  );
}