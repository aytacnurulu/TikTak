import Image, { StaticImageData } from 'next/image';
import Card from '@/shared/components/Card';

interface PromoBannerProps {
  bgColor?: string;
  eyebrow: string;
  number: string;
  badgeText: string;
  image: string | StaticImageData;
  imageAlt?: string;
  onClick?: () => void;
  className?: string;
}

export default function PromoBanner({
  bgColor,
  eyebrow,
  number,
  badgeText,
  image,
  imageAlt = '',
  onClick,
  className = '',
}: PromoBannerProps) {
  return (
    <Card
      onClick={onClick}
      className={`relative border-0 flex flex-col items-center justify-between aspect-[350/560] pt-16 pb-8 overflow-visible ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative w-[110%] h-[260px] flex justify-center items-center top-20 left-4">
        <Image
          src={image}
          alt={imageAlt}
          width={500}
          height={300}
          priority
          className="w-full h-auto object-contain pointer-events-none"
        />
      </div>

      <div className="w-full px-6 flex flex-col items-center text-center text-white z-10 [text-shadow:_3px_0px_7px_rgba(0,0,0,0.25)]">
        <p className="text-xl sm:text-3xl font-black uppercase tracking-tight leading-tight mb-2">
          {eyebrow}
        </p>

        <div className="flex items-center justify-center gap-2">
          <span className="text-7xl sm:text-[80px] font-black leading-none tracking-tighter">
            {number}
          </span>

          <span className="font-codec-pro font-extrabold uppercase text-sm sm:text-3xl leading-[110%] text-left">
            {badgeText.split(' ').map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </span>
        </div>
      </div>
    </Card>
  );
}