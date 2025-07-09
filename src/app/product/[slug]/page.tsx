import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/container/ContainerPage";
import { getShoe } from "@/services/api/shoes/getShoe";
import { Shoe, ShoesResponse } from "@/types/shoes";

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const shoeData: ShoesResponse = await getShoe({ slug });
  const shoe: Shoe = shoeData.shoes[0];

  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    { href: "/product", label: shoe.name, isCurrent: true },
  ];

  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
    </ContainerPage>
  );
};

export default ProductDetail;
