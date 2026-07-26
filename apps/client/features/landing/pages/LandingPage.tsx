"use client";

import Spinner from "@/shared/components/Spinner";
import HeroCarousel from "../components/HeroCarousel/HeroCarousel";
import SpecialOffers from "../components/SpecialOffers/SpecialOffers";
import StatsSection from "../components/StatsSection/StatsSection";
import { useCampaignsQuery } from "../hooks/useLanding";
import Footer from "@/shared/components/Footer";

const LandingPage = () => {
  const { data: campaigns, isLoading } = useCampaignsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="py-8 space-y-10">
      <HeroCarousel campaigns={campaigns ?? []} />
      <SpecialOffers campaigns={campaigns?.slice(2, 4) ?? []} />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
