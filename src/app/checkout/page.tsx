import CustomBreadcrumb from "@/shared/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/shared/components/ContainerPage";
import { requireAuth } from "@/shared/lib/auth-validation";
import CheckoutClient from "@/features/order/components/CheckoutClient";
import WrapperSection from "@/shared/components/WrapperSection";
import { fetchCart } from "@/core/infrastructure/repositories/cart/getCart";
import { GetCartResponse } from "@/core/domain/cart";

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
