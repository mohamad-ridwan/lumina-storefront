import { CheckoutClientWrapper } from "./CheckoutClientWrapper";
import { CartItem } from "@/core/domain/cart";

interface CheckoutClientProps {
  cartItems: CartItem[];
  cartTotalPrice: number;
  totalProduct: number;
}

const CheckoutClient: React.FC<CheckoutClientProps> = ({ ...props }: CheckoutClientProps) => {
  return <CheckoutClientWrapper {...props} />;
};

export default CheckoutClient;
