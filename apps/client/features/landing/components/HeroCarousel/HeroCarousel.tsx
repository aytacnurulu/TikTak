"use client";

import { useState } from "react";
import Button from "@/shared/components/Button";
import type { Campaign } from "@tiktak/types";

interface HeroCarouselProps {
  campaigns: Campaign[];
}

const gradients = ["from-success to-emerald-800", "from-error to-rose-900"];

const HeroCarousel = ({ campaigns }: HeroCarouselProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const visible = campaigns.slice(startIndex, startIndex + 2);
  const canPrev = startIndex > 0;
  const canNext = startIndex + 2 < campaigns.length;

  if (campaigns.length === 0) return null;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visible.map((campaign, i) => (
          <div
            key={campaign.id}
            className={`relative overflow-hidden rounded-[10px] bg-gradient-to-br ${gradients[(startIndex + i) % gradients.length]} text-white p-8 min-h-[220px] flex flex-col justify-between`}
          >
            <div>
              <h3 className="text-2xl font-bold mb-1">{campaign.title}</h3>
              {campaign.description && (
                <p className="text-sm opacity-90">{campaign.description}</p>
              )}
            </div>
            <Button variant="success" size="sm" className="w-fit">
              Ətraflı
            </Button>
          </div>
        ))}
      </div>

      {canPrev && (
        <button
          onClick={() => setStartIndex((i) => i - 1)}
          aria-label="Əvvəlki"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-white shadow flex items-center justify-center"
        >
          ‹
        </button>
      )}
      {canNext && (
        <button
          onClick={() => setStartIndex((i) => i + 1)}
          aria-label="Növbəti"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-9 w-9 rounded-full bg-white shadow flex items-center justify-center"
        >
          ›
        </button>
      )}
    </div>
  );
};

export default HeroCarousel;
