import ContainerPage from "@/container/ContainerPage";
import Header from "@/sections/latest-offers/Header";
import ProductContent from "@/sections/latest-offers/ProductContent";
import { getLatestOffers } from "@/services/api/latestOffers/getLatestOffers";
import { getShoe } from "@/services/api/shoes/getShoe";
import { LatestOffer } from "@/types/latestOffers";
import { Shoe } from "@/types/shoes";

const LatestOffers = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const latestOffers: LatestOffer[] = await getLatestOffers({ slug });
  const shoes: Shoe[] = await getShoe({ offerId: latestOffers[0]._id });
  if (!latestOffers[0]?._id || shoes.length === 0) {
    return;
  }
  return (
    <ContainerPage>
      <Header offers={latestOffers[0]} />
      <ProductContent shoes={shoes} label={latestOffers[0].label} />
    </ContainerPage>
  );
};

export default LatestOffers;
