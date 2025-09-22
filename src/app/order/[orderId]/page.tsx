import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/container/ContainerPage";
import OrderDetailContent from "@/sections/order/order-detail/OrderDetailContent";
import { getOrderDetail } from "@/services/api/order/getOrderDetail";
import { CreateOrderResponse } from "@/types/order";

export const dynamic = "force-dynamic";

const OrderDetail = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;
  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    { href: "/order", label: "Order" },
    { href: `/order/${orderId}`, label: "Your Order", isCurrent: true },
  ];

  const orderDetail: CreateOrderResponse = await getOrderDetail({ orderId });
  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
      <OrderDetailContent order={orderDetail.order} />
    </ContainerPage>
  );
};

export default OrderDetail;
