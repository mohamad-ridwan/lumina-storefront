import BaseCard from "@/components/card/BaseCard";
import WrapperSection from "@/sections/WrapperSection";
import { getShoe } from "@/services/api/shoes/getShoe";
import { Shoe } from "@/types/shoes";

const LatestOffers = async () => {
  const shoes: Shoe[] = await getShoe({ limit: 4, newArrival: true });
  if (!shoes?.length) {
    return null;
  }
  return (
    <WrapperSection title="Latest offers">
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
            imageClassName="h-[150px] md:h-[200px] w-full rounded-lg object-cover"
          />
        ))}
      </div>
    </WrapperSection>
  );
};

export default LatestOffers;
