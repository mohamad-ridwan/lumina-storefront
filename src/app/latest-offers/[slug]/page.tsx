import ContainerPage from "@/container/ContainerPage";
import Header from "@/sections/latest-offers/Header";
import ProductContent from "@/sections/latest-offers/ProductContent";
import { getLatestOffers } from "@/services/api/latestOffers/getLatestOffers";
import { getShoe } from "@/services/api/shoes/getShoe";
import { LatestOffer } from "@/types/latestOffers";
import { Shoe, ShoesResponse } from "@/types/shoes";

const LatestOffers = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { slug } = await params;
  const { page } = await searchParams;
  const latestOffers: LatestOffer[] = await getLatestOffers({ slug });
  const shoeData: ShoesResponse = await getShoe({
    offerId: latestOffers[0]._id,
    limit: 20,
    page: page ? Number(page) : undefined,
  });
  const shoes: Shoe[] = shoeData.shoes;

  if (!latestOffers[0]?._id || shoes.length === 0) {
    return;
  }
  return (
    <ContainerPage>
      <Header offers={latestOffers[0]} />
      <ProductContent
        shoes={shoes}
        label={latestOffers[0].label}
        pagination={{
          limit: shoeData.limit,
          total: shoeData.total,
          totalPages: shoeData.totalPages,
          currentPage: shoeData.currentPage,
        }}
      />
    </ContainerPage>
  );
};

export default LatestOffers;
