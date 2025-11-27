import ContainerPage from "@/container/ContainerPage";
import { getTheme } from "@/core/infrastructure/services/api/theme";
import { getShoe } from "@/core/usecases/product";
import ProductContent from "@/features/product/components/ProductContent";
import CustomBreadcrumb from "@/shared/components/breadcrumbs/CustomBreadcrumb";
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

  const theme = await getTheme();

  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
      <ProductContent
        shoes={shoes}
        label={breadcrumbItems[1].label}
        sortParams={sort as string}
        theme={theme}
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
