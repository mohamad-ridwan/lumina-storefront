import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/container/ContainerPage";
import { fetchCart } from "@/services/api/cart/getCart";
import { GetCartResponse } from "@/types/cart";

const CartPage = async () => {
  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    { href: "/cart", label: "Cart", isCurrent: true },
  ];
  const cartData: GetCartResponse = await fetchCart({
    userId: "67e65beb165cb6e6184d63c0",
  });
  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
    </ContainerPage>
  );
};

export default CartPage;
