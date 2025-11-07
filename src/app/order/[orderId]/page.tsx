import ContainerPage from "@/container/ContainerPage";
import { getOrderDetail } from "@/core/usecases/order";
import OrderDetailContent from "@/features/order/components/order-detail/OrderDetailContent";
import CustomBreadcrumb from "@/shared/components/breadcrumbs/CustomBreadcrumb";
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
