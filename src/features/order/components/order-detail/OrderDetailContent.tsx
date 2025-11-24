import { OrderDetailContentWrapper } from "./OrderDetailContentWrapper";
import { Order } from "@/types/order";

interface OrderDetailContentProps {
  order: Order;
}

const OrderDetailContent: React.FC<OrderDetailContentProps> = ({ ...props }: OrderDetailContentProps) => {
  return <OrderDetailContentWrapper {...props} />;
};

export default OrderDetailContent;
