"use client";

import Link from "next/link";
import { CartItem } from "@/core/domain/cart";
import BaseCard from "@/shared/components/card/BaseCard";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useReduxOrder } from "@/hooks/useOrder";

// Import Server Action dan Tipe dari API // Sesuaikan path ini sesuai lokasi file server action Anda

/**
 * @fileoverview Checkout Client Component
 * This component handles the checkout process, including address form submission
 * and displaying a cart review, integrating with a server action for order creation.
 */

/**
 * Props untuk komponen CheckoutClient.
 */
interface CheckoutClientProps {
  cartItems: CartItem[]; // Array dari item keranjang yang akan ditampilkan
  cartTotalPrice: number; // Total harga semua item di keranjang
  totalProduct: number; // Total jumlah produk (sum of all quantities)
}

const CheckoutClient: React.FC<CheckoutClientProps> = ({
  cartItems,
  cartTotalPrice,
  totalProduct,
}) => {
  const {
    formCheckout,
    onSubmitCheckout,
    submitOrderError,
    isLoadingCreateOrder,
    formatPrice,
  } = useReduxOrder({ cartItems });

  return (
    <>
      {/* Grid responsif untuk 2 section */}
      {/* Di mobile: 1 kolom. Di desktop: 2 kolom (form: 2/3, review: 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bagian Kiri (lg:col-span-2): Form Alamat */}
        <div className="lg:col-span-2 bg-card py-6 rounded-lg">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Detail Pengiriman
          </h2>
          <Form {...formCheckout}>
            {/* Beri ID pada form agar tombol submit di luar form bisa terhubung */}
            <form
              onSubmit={formCheckout.handleSubmit(onSubmitCheckout)}
              className="space-y-4"
              id="checkout-form"
            >
              <FormField
                control={formCheckout.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan nama lengkap Anda"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCheckout.control}
                name="email" // Field Email baru
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="contoh@domain.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCheckout.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Contoh: 081234567890"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCheckout.control}
                name="street" // Disesuaikan menjadi 'street'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Alamat Lengkap (Jalan, No Rumah, RT/RW)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jl. Contoh No. 123, RT/RW 001/002"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={formCheckout.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kota/Kabupaten</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: Jakarta Pusat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formCheckout.control}
                  name="province" // Field Provinsi baru
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provinsi</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: DKI Jakarta" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={formCheckout.control}
                name="postalCode" // Disesuaikan menjadi 'postalCode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode Pos</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Contoh: 10250"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCheckout.control}
                name="notes" // Field Catatan opsional
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catatan (Opsional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Jangan tinggalkan di depan pintu jika tidak ada orang."
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        {/* Bagian Kanan (lg:col-span-1): Review Keranjang & Ringkasan */}
        <div className="lg:col-span-1 bg-slate-100 p-6 rounded-lg h-fit sticky top-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Ringkasan Pesanan
          </h2>

          {/* Daftar Item Keranjang (Review) */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2 mb-4">
            {cartItems.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Keranjang kosong.
              </p>
            ) : (
              cartItems.map((item) => {
                const variantInfo = item.variantOptionValues
                  ? Object.values(item.variantOptionValues).join(" / ")
                  : "";

                const descriptionText = `
                  ${variantInfo ? `Varian: ${variantInfo} <br/>` : ""}
                  Kuantitas: ${item.quantity} x ${formatPrice(item.price)}
                `;

                const directProductSlug = item.selectedVariantId
                  ? `/product/${item.slug}?variant=${item.selectedVariantId}&quantity=${item.quantity}`
                  : `/product/${item.slug}?quantity=${item.quantity}`;

                return (
                  <Link
                    href={directProductSlug}
                    key={item._id}
                    className="block"
                  >
                    <BaseCard
                      image={
                        item.image ||
                        "https://placehold.co/60x60/E0E0E0/666666?text=No+Image"
                      }
                      title={item.name}
                      description={descriptionText}
                      imgHeight={60}
                      imgWidth={60}
                      wrapperCard="flex-row items-center gap-3 p-2 border rounded-lg bg-gray-50"
                      wrapperImgClassName="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md"
                      imageClassName="object-cover w-full h-full"
                      titleClassName="text-sm font-medium text-gray-900 line-clamp-1"
                      descriptionClassName="text-xs text-gray-600 mt-0.5"
                    />
                  </Link>
                );
              })
            )}
          </div>

          {/* Ringkasan Harga */}
          <div className="space-y-2 text-muted-foreground border-t pt-4 mt-4">
            <div className="flex justify-between">
              <span className="text-xs">
                Total Item ({totalProduct} produk):
              </span>
              <span className="text-sm font-medium text-foreground">
                {formatPrice(cartTotalPrice)}
              </span>
            </div>
            {/* Anda bisa menambahkan biaya pengiriman, diskon, dll. di sini */}
            <div className="flex justify-between font-bold text-foreground text-sm pt-2 border-t mt-2">
              <span>Total Pembayaran:</span>
              <span>{formatPrice(cartTotalPrice)}</span>
            </div>
          </div>

          {/* Tombol Submit Order */}
          <Button
            type="submit" // Tipe submit agar terhubung dengan form
            form="checkout-form" // ID form yang akan disubmit
            className="w-full mt-6 text-white py-3 rounded-md font-semibold cursor-pointer"
            onClick={formCheckout.handleSubmit(onSubmitCheckout)} // Panggil handleSubmit dari form
            disabled={isLoadingCreateOrder || cartItems.length === 0} // Nonaktifkan saat submit atau keranjang kosong
          >
            {isLoadingCreateOrder ? "Memproses Order..." : "Order Sekarang"}
          </Button>
          {submitOrderError && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {submitOrderError}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-4 text-center">
            Dengan mengklik {`"Order Sekarang"`}, Anda menyetujui Syarat dan
            Ketentuan kami.
          </p>
        </div>
      </div>
    </>
  );
};

export default CheckoutClient;
