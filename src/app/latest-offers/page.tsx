import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/container/ContainerPage";
import ProductLists from "@/sections/latest-offers/ProductLists";
import { getShoe } from "@/services/api/shoes/getShoe";
import { Shoe } from "@/types/shoes";

const LatestOffers = async () => {
  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    { href: "/latest-offers", label: "Latest Offers", isCurrent: true },
  ];
  const shoes: Shoe[] = await getShoe({ newArrival: true, limit: 20 });

  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
      <ProductLists shoes={shoes} label={breadcrumbItems[1].label} />
    </ContainerPage>
  );
};

export default LatestOffers;
