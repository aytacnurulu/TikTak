import type { Campaign } from "@tiktak/types";

interface SpecialOffersProps {
  campaigns: Campaign[];
}

const SpecialOffers = ({ campaigns }: SpecialOffersProps) => {
  if (campaigns.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-success mb-1">
        Xüsusi təkliflər!
      </h2>
      <p className="text-gray-500 mb-4">
        TIK TAK hər gün üçün super təklifləri qaçırmayın!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="relative overflow-hidden rounded-[10px] min-h-[180px] p-6 flex flex-col justify-end bg-gray-800 text-white"
          >
            <h3 className="text-lg font-semibold">{campaign.title}</h3>
            {campaign.description && (
              <p className="text-sm opacity-80 mt-1">{campaign.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
