import { landingService } from "../api/landing.service";
import HeroCarousel from "../components/HeroCarousel/HeroCarousel";
import SpecialOffers from "../components/SpecialOffers/SpecialOffers";
import StatsSection from "../components/StatsSection/StatsSection";

const LandingPage = async () => {
  const campaigns = await landingService.getCampaigns();

  return (
    <div className="py-8 space-y-10">
      <HeroCarousel campaigns={campaigns} />
      <SpecialOffers campaigns={campaigns.slice(2, 4)} />
      <StatsSection />
    </div>
  );
};

export default LandingPage;
