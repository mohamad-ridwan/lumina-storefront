import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/container/ContainerPage";
import ProductContent from "@/components/ProductContent";
import { getShoe } from "@/services/api/shoes/getShoe";
import { Shoe, ShoesResponse } from "@/types/shoes";

const LatestOffers = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { page, sort } = await searchParams;
  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    { href: "/latest-offers", label: "Latest Offers", isCurrent: true },
  ];
  const shoeData: ShoesResponse = await getShoe({
    newArrival: true,
    limit: 20,
    page: page ? Number(page) : undefined,
    sort: (sort as "termahal") ?? undefined,
  });
  const shoes: Shoe[] = shoeData.shoes;

  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
      <ProductContent
        shoes={shoes}
        label={breadcrumbItems[1].label}
        sortParams={sort as string}
        pagination={{
          limit: shoeData.limit,
          totalPages: shoeData.totalPages,
          total: shoeData.total,
          currentPage: shoeData.currentPage,
        }}
      />
    </ContainerPage>
  );
};

export default LatestOffers;
