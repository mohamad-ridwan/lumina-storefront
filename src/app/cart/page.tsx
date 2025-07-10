import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/container/ContainerPage";
import { fetchCart } from "@/services/api/cart/getCart";
import { GetCartResponse } from "@/types/cart";
import CartContent from "@/components/cart/CartContent";

// Helper function to get userId from localStorage in server component
async function getUserIdFromClient(): Promise<string> {
  // For now, return static userId since we can't access localStorage in server component
  // The CartContent component will handle getting userId from localStorage on client side
  return "67e65beb165cb6e6184d63c0";
}

const CartPage = async () => {
  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    { href: "/cart", label: "Cart", isCurrent: true },
  ];
  
  try {
    const userId = await getUserIdFromClient();
    const cartData: GetCartResponse = await fetchCart({ userId });
    
    return (
      <ContainerPage>
        <CustomBreadcrumb items={breadcrumbItems} />
        <div className="mt-6">
          <CartContent initialCartData={cartData} />
        </div>
      </ContainerPage>
    );
  } catch (error) {
    console.error("Error fetching cart data:", error);
    
    // Return empty cart state if error occurs
    const emptyCartData: GetCartResponse = {
      success: false,
      message: "Gagal memuat data keranjang",
      cartItems: [],
      currentCartTotalUniqueItems: 0,
      cartTotalPrice: 0,
    };
    
    return (
      <ContainerPage>
        <CustomBreadcrumb items={breadcrumbItems} />
        <div className="mt-6">
          <CartContent initialCartData={emptyCartData} />
        </div>
      </ContainerPage>
    );
  }
};

export default CartPage;
