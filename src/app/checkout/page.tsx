import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/container/ContainerPage";
import { requireAuth } from "@/lib/auth-validation";
import WrapperSection from "@/sections/WrapperSection";

export const dynamic = "force-dynamic";

const CheckoutPage = async () => {
  await requireAuth("/checkout");
  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    { href: "/checkout", label: "Checkout", isCurrent: true },
  ];

  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
      <WrapperSection title="Checkout"></WrapperSection>
    </ContainerPage>
  );
};

export default CheckoutPage;
