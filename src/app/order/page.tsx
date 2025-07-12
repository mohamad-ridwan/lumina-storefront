import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/container/ContainerPage";
import { getUserProfile } from "@/services/api/auth/profile";
import { getOrders } from "@/services/api/order/getOrders";
import { OrdersResponse } from "@/types/order";
import { User } from "@/types/user";
import { cookies } from "next/headers";

const COOKIE_NAME = "user-session-lumina-storefront";

const OrdersPage = async () => {
  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    { href: "/order", label: "Orders", isCurrent: true },
  ];
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const user: User = await getUserProfile(token as string);
  const orders: OrdersResponse = await getOrders({
    userId: user._id as string,
  });
  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
    </ContainerPage>
  );
};

export default OrdersPage;
