import { OrdersContentWrapper } from "./OrdersContentWrapper";
import { Order } from "@/types/order";
import { Pagination } from "@/types/pagination";

interface OrdersContentProps {
  orders: Order[];
  pagination: Pagination;
}

const OrdersContent: React.FC<OrdersContentProps> = ({ ...props }: OrdersContentProps) => {
  return <OrdersContentWrapper {...props} />;
};

export default OrdersContent;
