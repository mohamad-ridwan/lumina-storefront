import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/container/ContainerPage";
import { requireAuth } from "@/lib/auth-validation";
import CheckoutClient from "@/sections/checkout/CheckoutClient";
import WrapperSection from "@/sections/WrapperSection";
import { fetchCart } from "@/services/api/cart/getCart";
import { GetCartResponse } from "@/types/cart";

export const dynamic = "force-dynamic";

const CheckoutPage = async () => {
  const { user } = await requireAuth("/checkout");
  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    { href: "/checkout", label: "Checkout", isCurrent: true },
  ];

  const cart: GetCartResponse = await fetchCart({ userId: user._id });

  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
      <WrapperSection title="Checkout">
        <CheckoutClient
          cartItems={cart.cartItems}
          totalProduct={cart.totalProduct}
          cartTotalPrice={cart.cartTotalPrice}
        />
      </WrapperSection>
    </ContainerPage>
  );
};

export default CheckoutPage;
