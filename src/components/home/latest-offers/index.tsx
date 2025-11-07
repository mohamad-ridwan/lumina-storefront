import { getLatestOffers } from "@/core/usecases/latest-offers";
import { getShoe } from "@/core/usecases/product";
import ProductLists from "@/features/product/components/ProductLists";
import BaseBannerCard from "@/shared/components/card/BaseBannerCard";
import RightHeaderSingleBtnNav from "@/shared/components/sections/RightHeaderSingleBtnNav";
import WrapperSection from "@/shared/components/WrapperSection";
import { LatestOffer } from "@/types/latestOffers";
import { Shoe, ShoesResponse } from "@/types/shoes";

const LatestOffers = async () => {
  const shoeData: ShoesResponse = await getShoe({ limit: 4, newArrival: true });
  const shoes: Shoe[] = shoeData.shoes;
  const latestOffers: LatestOffer[] = await getLatestOffers({});
  if (!shoes?.length) {
    return null;
  }

  return (
    <WrapperSection
      title="Latest offers"
      rightHeader={
        <RightHeaderSingleBtnNav slug="/latest-offers" name="Lihat Semua" />
      }
    >
      <ProductLists shoes={shoes} />
      {latestOffers.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-12">
          {latestOffers.map((offers, i) => (
            <BaseBannerCard
              key={i}
              label={offers.label}
              title={offers.title}
              description={offers.description}
              imageUrl={offers.imageUrl}
              slug={`latest-offers/${offers.slug}`}
            />
          ))}
        </div>
      )}
    </WrapperSection>
  );
};

export default LatestOffers;
