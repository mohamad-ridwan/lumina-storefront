import { ThemeComponent } from "@/shared/lib/Theme";
import { Order } from "@/types/order";

interface OrderDetailContentProps {
  order: Order;
}

export const OrderDetailContentWrapper = async ({ ...props }: OrderDetailContentProps) => {
  const Component = await ThemeComponent<OrderDetailContentProps>("OrderDetailContent");

  return <Component {...props} />;
};


