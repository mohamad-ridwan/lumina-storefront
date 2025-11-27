import { Button } from "@/shared/components/ui/button";
import ContainerPage from "@/container/ContainerPage"; // Asumsi path ini benar
import { getUserProfile } from "@/core/usecases/user";
import { getOrders } from "@/core/usecases/order";
import { OrdersResponse, Order } from "@/types/order"; // Impor OrdersResponse dan Order
import { Pagination } from "@/types/pagination";
import { User } from "@/types/user"; // Impor User
import { cookies } from "next/headers"; // Impor komponen OrdersContent yang baru
import Link from "next/link";
import CustomBreadcrumb from "@/shared/components/breadcrumbs/CustomBreadcrumb";
import { getTheme } from "@/core/infrastructure/services/api/theme";
import { loadThemeComponent } from "@/shared/lib/Theme";
import { OrdersContentProps } from "@/shared/types/order";

const COOKIE_NAME = "user-session-lumina-storefront";

export const dynamic = "force-dynamic";

const OrdersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { page, status, limit } = await searchParams;

  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    { href: "/order", label: "Pesanan Saya", isCurrent: true },
  ];
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  let user: User | null = null;
  let orders: Order[] = [];
  let errorMessage: string | null = null;
  let pagination = {} as Pagination;

  try {
    if (!token) {
      throw new Error("Token otentikasi tidak ditemukan.");
    }
    user = await getUserProfile(token);
    if (!user || !user._id) {
      throw new Error("Profil pengguna tidak dapat dimuat.");
    }
    const ordersResponse: OrdersResponse = await getOrders({
      userId: user._id,
      status: status ? (status as "pending") : undefined,
      limit: Number(limit) ? Number(limit) : 10,
      page: Number(page) ? Number(page) : 1,
    });
    if (ordersResponse.success) {
      orders = ordersResponse.data;
      pagination = ordersResponse.pagination;
    } else {
      errorMessage =
        ordersResponse.message || "Gagal mengambil daftar pesanan.";
      console.error("API Error:", errorMessage);
    }
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan saat memuat pesanan.";
    console.error("Error loading orders page:", error);
  }

  const theme = await getTheme();
  const OrdersContent = await loadThemeComponent<OrdersContentProps>(
    theme,
    "OrdersContent"
  );

  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
      {errorMessage ? (
        <div className="text-center py-12 bg-card rounded-lg shadow-md">
          <p className="text-red-600 text-lg">{errorMessage}</p>
          {/* Opsional: Tombol untuk kembali ke login jika error terkait auth */}
          {!user && (
            <Link href="/auth/login" passHref>
              <Button className="mt-6 bg-custom-blue text-white hover:bg-custom-blue/90">
                Login Kembali
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <OrdersContent orders={orders} pagination={pagination} />
      )}
    </ContainerPage>
  );
};

export default OrdersPage;
