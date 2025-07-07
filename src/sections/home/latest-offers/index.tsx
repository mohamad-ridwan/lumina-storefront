import BaseBannerCard from "@/components/card/BaseBannerCard";
import BaseCard from "@/components/card/BaseCard";
import RightHeaderSingleBtnNav from "@/components/sections/RightHeaderSingleBtnNav";
import WrapperSection from "@/sections/WrapperSection";
import { getLatestOffers } from "@/services/api/latestOffers/getLatestOffers";
import { getShoe } from "@/services/api/shoes/getShoe";
import { LatestOffer } from "@/types/latestOffers";
import { Shoe } from "@/types/shoes";

const LatestOffers = async () => {
  const shoes: Shoe[] = await getShoe({ limit: 4, newArrival: true });
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
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shoes.map((shoe, key) => (
          <BaseCard
            key={key}
            wrapperCard="justify-start items-start"
            image={shoe.image}
            title={shoe.name}
            titleClassName="text-sm font-normal text-foreground"
            descriptionClassName="text-sm text-black font-semibold"
            description={
              shoe.price
                ? `<small>Rp</small>${shoe.price.toLocaleString("id-ID")}`
                : "Harga tidak tersedia"
            }
            wrapperImgClassName="rounded-lg w-full"
            imgHeight={280}
            imgWidth={280}
            imageClassName="h-full w-full rounded-lg object-cover"
          />
        ))}
      </div>
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
