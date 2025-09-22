import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import ProductContent from "@/components/ProductContent";
import ContainerPage from "@/container/ContainerPage";
import { getShoe } from "@/services/api/shoes/getShoe";
import { Shoe, ShoesResponse } from "@/types/shoes";

const SearchPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ keywords: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { keywords } = await params;
  const { page, sort } = await searchParams;

  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    { href: "/search", label: "Hasil yang Anda cari", isCurrent: true },
  ];
  const shoeData: ShoesResponse = await getShoe({
    limit: 20,
    page: page ? Number(page) : undefined,
    sort: (sort as "termahal") ?? undefined,
    search: keywords,
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

export default SearchPage;
