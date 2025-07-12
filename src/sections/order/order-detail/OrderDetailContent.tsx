import React from "react";
import { Order, OrderItem } from "@/types/order"; // Impor tipe Order dan turunannya
import BaseCard from "@/components/card/BaseCard"; // Impor komponen BaseCard
import WrapperSection from "@/sections/WrapperSection";

/**
 * @fileoverview Order Detail Content Component (React Server Component)
 * This component displays the comprehensive details of a single order,
 * including order summary, shipping address, and a list of ordered items.
 * It is designed as an RSC as it has no interactive UI elements.
 */

/**
 * Props untuk komponen OrderDetailContent.
 */
interface OrderDetailContentProps {
  order: Order; // Objek pesanan lengkap yang akan ditampilkan
}

// Komponen OrderDetailContent
const OrderDetailContent: React.FC<OrderDetailContentProps> = ({ order }) => {
  // Helper function untuk memformat harga
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  // Helper function untuk memformat tanggal
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

  // Hitung total produk (jumlah semua kuantitas item)
  const totalProductsInOrder = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <WrapperSection title="Detail Pesanan">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bagian Kiri (lg:col-span-2): Ringkasan Pesanan & Alamat Pengiriman */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ringkasan Pesanan */}
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Ringkasan Pesanan
            </h2>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between">
                <span className="font-medium">ID Pesanan:</span>
                <span className="text-foreground">{order.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span
                  className={`font-semibold ${
                    order.status === "pending"
                      ? "text-yellow-600"
                      : order.status === "completed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Tanggal Pesanan:</span>
                <span className="text-foreground">
                  {formatDate(order.orderedAt)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-foreground text-xl pt-2 border-t mt-2">
                <span>Total Pembayaran:</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Alamat Pengiriman */}
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Alamat Pengiriman
            </h2>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <span className="font-medium">Nama Lengkap:</span>{" "}
                {order.shippingAddress.fullName}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {order.shippingAddress.email}
              </p>
              <p>
                <span className="font-medium">Telepon:</span>{" "}
                {order.shippingAddress.phoneNumber}
              </p>
              <p>
                <span className="font-medium">Alamat:</span>{" "}
                {order.shippingAddress.street}
              </p>
              <p>
                <span className="font-medium">Kota:</span>{" "}
                {order.shippingAddress.city}
              </p>
              <p>
                <span className="font-medium">Provinsi:</span>{" "}
                {order.shippingAddress.province}
              </p>
              <p>
                <span className="font-medium">Kode Pos:</span>{" "}
                {order.shippingAddress.postalCode}
              </p>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Metode Pembayaran
            </h2>
            <p className="text-muted-foreground">{order.paymentMethod}</p>
            {order.notes && (
              <div className="mt-4">
                <h3 className="font-semibold text-foreground mb-2">Catatan:</h3>
                <p className="text-muted-foreground italic">{order.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Bagian Kanan (lg:col-span-1): Daftar Item Pesanan */}
        <div className="lg:col-span-1 bg-slate-100 p-6 rounded-lg shadow-md h-fit sticky top-4">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Item Pesanan ({totalProductsInOrder} produk)
          </h2>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
            {" "}
            {/* Max height dan scrollable */}
            {order.items.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Tidak ada item dalam pesanan ini.
              </p>
            ) : (
              order.items.map((item: OrderItem) => {
                const variantInfo = item.variant?.optionValues
                  ? Object.values(item.variant.optionValues).join(" / ")
                  : "";

                // Deskripsi untuk BaseCard
                const descriptionText = `
                  ${variantInfo ? `Varian: ${variantInfo} <br/>` : ""}
                  Kuantitas: ${item.quantity} <br/>
                  Harga: ${formatPrice(item.price)}
                `;

                return (
                  <BaseCard
                    key={item._id} // Gunakan _id sebagai key
                    image={
                      item.variant?.imageUrl ||
                      "https://placehold.co/64x64/E0E0E0/666666?text=No+Image"
                    }
                    title={item.name}
                    description={descriptionText}
                    imgHeight={64} // Ukuran gambar lebih kecil
                    imgWidth={64} // Ukuran gambar lebih kecil
                    wrapperCard="flex-row items-center gap-3 p-2 border rounded-lg bg-white shadow-xs" // Padding dan gap lebih kecil
                    wrapperImgClassName="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md" // Ukuran wrapper gambar
                    imageClassName="object-cover w-full h-full"
                    titleClassName="text-sm font-medium text-gray-900 line-clamp-1" // Ukuran font lebih kecil
                    descriptionClassName="text-xs text-gray-600 mt-0.5" // Ukuran font lebih kecil
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </WrapperSection>
  );
};

export default OrderDetailContent;
