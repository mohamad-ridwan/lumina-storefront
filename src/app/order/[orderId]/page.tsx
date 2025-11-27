import ContainerPage from "@/container/ContainerPage";
import { getTheme } from "@/core/infrastructure/services/api/theme";
import { getOrderDetail } from "@/core/usecases/order";
import CustomBreadcrumb from "@/shared/components/breadcrumbs/CustomBreadcrumb";
import { loadThemeComponent } from "@/shared/lib/Theme";
import { OrderDetailContentProps } from "@/shared/types/order";
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
  const theme = await getTheme();
  const OrderDetailContent = await loadThemeComponent<OrderDetailContentProps>(
    theme,
    "OrderDetailContent"
  );
  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
      <OrderDetailContent order={orderDetail.order} />
    </ContainerPage>
  );
};

export default OrderDetail;
