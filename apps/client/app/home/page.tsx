import PromoBanner from '@/features/products/components/PromoBanner';
import InfoGrid from '@/features/products/components/InfoGrid';
import { Metadata } from 'next';
import InfoCard from '@/features/products/components/InfoCard';

export const metadata: Metadata = {
    title: 'Home Page',
    //   description: '...',
};

export default function HomePage() {
    return <section aria-label="Aksiyalar və kateqoriyalar" className="max-w-7xl mx-auto px-4 py-6 flex gap-4 items-start">
        <PromoBanner
            bgColor="#76CB4F"
            eyebrow="ONLİNE SİFARİŞ ET"
            number="15"
            badgeText="DƏQİQƏYƏ QAPINDA"
            image="/image/homebanner.svg"
            imageAlt="Çiyələk və süd"
            className="w-[330px]"
        />
        <InfoGrid ariaLabel="Kateqoriyalar" className="flex-1">
            {Array.from({ length: 18 }).map((_, index) => (
                <InfoCard key={index} image="/image/apple.svg" label="Tərəvəz" />
            ))}
        </InfoGrid>
    </section>
}