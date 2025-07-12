// app/order/page.tsx
import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import { Button } from "@/components/ui/button";
import ContainerPage from "@/container/ContainerPage"; // Asumsi path ini benar
import OrdersContent from "@/sections/order/OrdersContent";
import { getUserProfile } from "@/services/api/auth/profile"; // Asumsi path ini benar
import { getOrders } from "@/services/api/order/getOrders"; // Asumsi path ini benar
import { OrdersResponse, Order } from "@/types/order"; // Impor OrdersResponse dan Order
import { Pagination } from "@/types/pagination";
import { User } from "@/types/user"; // Impor User
import { cookies } from "next/headers"; // Impor komponen OrdersContent yang baru
import Link from "next/link";

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
      status: status ? "pending" : undefined,
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
