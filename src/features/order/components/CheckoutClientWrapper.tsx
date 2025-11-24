import { ThemeComponent } from "@/shared/lib/Theme";
import { CartItem } from "@/core/domain/cart";

interface CheckoutClientProps {
  cartItems: CartItem[];
  cartTotalPrice: number;
  totalProduct: number;
}

export const CheckoutClientWrapper = async ({ ...props }: CheckoutClientProps) => {
  const Component = await ThemeComponent<CheckoutClientProps>("CheckoutClient");

  return <Component {...props} />;
};


