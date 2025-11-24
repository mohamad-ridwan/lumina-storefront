import { ThemeComponent } from "@/shared/lib/Theme";
import { Order } from "@/types/order";
import { Pagination } from "@/types/pagination";

interface OrdersContentProps {
  orders: Order[];
  pagination: Pagination;
}

export const OrdersContentWrapper = async ({ ...props }: OrdersContentProps) => {
  const Component = await ThemeComponent<OrdersContentProps>("OrdersContent");

  return <Component {...props} />;
};


