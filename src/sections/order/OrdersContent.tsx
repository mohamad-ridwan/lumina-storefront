"use client";

import React from "react";
import Link from "next/link";
import { Order } from "@/types/order"; // Impor tipe Order dan OrderItem
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Impor komponen Tabs dari Shadcn UI
import { Button } from "@/components/ui/button"; // Impor Button untuk "Lihat Detail"
import BaseCard from "@/components/card/BaseCard"; // Impor komponen BaseCard
import { useRouter, useSearchParams, usePathname } from "next/navigation"; // Impor hooks dari next/navigation

/**
 * @fileoverview Orders Content Component
 * Komponen ini menampilkan pesanan pengguna yang dikategorikan ke dalam tab berdasarkan statusnya.
 * Ini adalah Client Component karena memiliki pemilihan tab interaktif.
 */

/**
 * Props untuk komponen OrdersContent.
 */
interface OrdersContentProps {
  orders: Order[]; // Array objek pesanan yang akan ditampilkan
}

const OrdersContent: React.FC<OrdersContentProps> = ({ orders }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Dapatkan status dari URL query parameter, default ke 'all'
  const currentTab = searchParams.get("status") || "all";

  // Helper function untuk memformat harga ke format IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  // Helper function untuk memformat tanggal dan waktu
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Fungsi untuk mendapatkan nama tampilan status dan kelas warna yang sesuai
  const getStatusDisplay = (status: string) => {
    let colorClass = "text-gray-600"; // Warna default
    let displayName = status;

    switch (status) {
      case "pending":
        displayName = "Menunggu Pembayaran";
        colorClass = "text-yellow-600";
        break;
      case "completed":
        displayName = "Selesai";
        colorClass = "text-green-600";
        break;
      case "cancelled":
        displayName = "Dibatalkan";
        colorClass = "text-red-600";
        break;
      case "processing": // Contoh status lain yang mungkin ada
        displayName = "Diproses";
        colorClass = "text-blue-600";
        break;
      default:
        displayName = status.charAt(0).toUpperCase() + status.slice(1);
        break;
    }
    return { displayName, colorClass };
  };

  // Filter pesanan berdasarkan status
  const filterOrders = (status: string) => {
    if (status === "all") {
      return orders;
    }
    return orders.filter((order) => order.status === status);
  };

  // Handler untuk perubahan tab
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("status"); // Hapus parameter status jika kembali ke 'all'
    } else {
      params.set("status", value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-foreground mb-6">Pesanan Saya</h1>

      {/* Tampilkan pesan jika tidak ada pesanan sama sekali */}
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg shadow-md">
          <p className="text-muted-foreground text-lg">
            Anda belum memiliki pesanan.
          </p>
          <Link href="/" passHref>
            <Button className="mt-6 bg-custom-blue text-white hover:bg-custom-blue/90">
              Mulai Belanja
            </Button>
          </Link>
        </div>
      ) : (
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          {/* Daftar Tab Trigger */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 h-auto">
            <TabsTrigger value="all">Semua Pesanan</TabsTrigger>
            <TabsTrigger value="pending">Menunggu Pembayaran</TabsTrigger>
            <TabsTrigger value="completed">Selesai</TabsTrigger>
            <TabsTrigger value="cancelled">Dibatalkan</TabsTrigger>
            {/* Tambahkan trigger lain jika ada status pesanan tambahan (misalnya 'processing', 'shipped') */}
          </TabsList>

          {/* Konten untuk Tab "Semua Pesanan" */}
          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filterOrders("all").length === 0 ? (
                <p className="text-muted-foreground text-center py-8 bg-card rounded-lg shadow-md">
                  Tidak ada pesanan.
                </p>
              ) : (
                filterOrders("all").map((order) => (
                  <OrderSummaryCard
                    key={order._id}
                    order={order}
                    formatPrice={formatPrice}
                    formatDate={formatDate}
                    getStatusDisplay={getStatusDisplay}
                  />
                ))
              )}
            </div>
          </TabsContent>

          {/* Konten untuk Tab "Menunggu Pembayaran" */}
          <TabsContent value="pending" className="mt-6">
            <div className="space-y-4">
              {filterOrders("pending").length === 0 ? (
                <p className="text-muted-foreground text-center py-8 bg-card rounded-lg shadow-md">
                  Tidak ada pesanan menunggu pembayaran.
                </p>
              ) : (
                filterOrders("pending").map((order) => (
                  <OrderSummaryCard
                    key={order._id}
                    order={order}
                    formatPrice={formatPrice}
                    formatDate={formatDate}
                    getStatusDisplay={getStatusDisplay}
                  />
                ))
              )}
            </div>
          </TabsContent>

          {/* Konten untuk Tab "Selesai" */}
          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {filterOrders("completed").length === 0 ? (
                <p className="text-muted-foreground text-center py-8 bg-card rounded-lg shadow-md">
                  Tidak ada pesanan selesai.
                </p>
              ) : (
                filterOrders("completed").map((order) => (
                  <OrderSummaryCard
                    key={order._id}
                    order={order}
                    formatPrice={formatPrice}
                    formatDate={formatDate}
                    getStatusDisplay={getStatusDisplay}
                  />
                ))
              )}
            </div>
          </TabsContent>

          {/* Konten untuk Tab "Dibatalkan" */}
          <TabsContent value="cancelled" className="mt-6">
            <div className="space-y-4">
              {filterOrders("cancelled").length === 0 ? (
                <p className="text-muted-foreground text-center py-8 bg-card rounded-lg shadow-md">
                  Tidak ada pesanan dibatalkan.
                </p>
              ) : (
                filterOrders("cancelled").map((order) => (
                  <OrderSummaryCard
                    key={order._id}
                    order={order}
                    formatPrice={formatPrice}
                    formatDate={formatDate}
                    getStatusDisplay={getStatusDisplay}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default OrdersContent;

// --- Helper Component untuk Ringkasan Kartu Pesanan ---
// Komponen ini menampilkan ringkasan dari satu pesanan individu
interface OrderSummaryCardProps {
  order: Order;
  formatPrice: (price: number) => string;
  formatDate: (isoString: string) => string;
  getStatusDisplay: (status: string) => {
    displayName: string;
    colorClass: string;
  };
}

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  order,
  formatPrice,
  formatDate,
  getStatusDisplay,
}) => {
  const { displayName, colorClass } = getStatusDisplay(order.status);
  const totalItemsCount = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="bg-card p-4 rounded-lg shadow-md border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Informasi Pesanan */}
      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-semibold text-foreground">
          Pesanan #{order.orderId}
        </h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Tanggal:</span>{" "}
          {formatDate(order.orderedAt)}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Status:</span>{" "}
          <span className={`font-semibold ${colorClass}`}>{displayName}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Total Produk:</span> {totalItemsCount}{" "}
          item
        </p>
        <p className="text-xl font-bold text-custom-blue">
          Total: {formatPrice(order.totalAmount)}
        </p>
      </div>

      {/* Pratinjau Item Pesanan (menggunakan BaseCard untuk beberapa item pertama) */}
      <div className="flex flex-wrap gap-2 md:w-1/2 lg:w-1/3 justify-end">
        {" "}
        {/* justify-end untuk rata kanan */}
        {order.items.slice(0, 3).map(
          (
            item // Tampilkan hingga 3 item
          ) => (
            <BaseCard
              key={item._id}
              image={
                item.variant?.imageUrl ||
                "https://placehold.co/64x64/E0E0E0/666666?text=No+Image"
              }
              imgHeight={64}
              imgWidth={64}
              wrapperCard="w-16 h-16 flex-shrink-0" // Jadikan kartu itu sendiri kecil
              wrapperImgClassName="w-full h-full rounded-md overflow-hidden border border-border" // Pembungkus gambar
              imageClassName="object-cover w-full h-full"
              // Tidak perlu judul atau deskripsi untuk pratinjau ini
            />
          )
        )}
        {order.items.length > 3 && (
          <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground border border-border flex-shrink-0">
            +{order.items.length - 3}
          </div>
        )}
      </div>

      {/* Tombol Lihat Detail */}
      <div className="md:self-end">
        {" "}
        {/* Sejajarkan tombol ke kanan-bawah di desktop */}
        <Link href={`/order/${order.orderId}`} passHref>
          <Button className="w-full md:w-auto text-white cursor-pointer">
            Lihat Detail
          </Button>
        </Link>
      </div>
    </div>
  );
};
