"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter untuk redirect
import { CartItem } from "@/types/cart"; // Pastikan path ini benar
import BaseCard from "@/components/card/BaseCard"; // Pastikan path ini benar
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  createOrder,
  ShippingAddressRequest,
} from "@/services/api/order/createOrder";
import { useSelector } from "react-redux";
import { selectUserAuthStatus } from "@/store/selectors";

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

// Skema validasi menggunakan Zod, disesuaikan dengan ShippingAddressRequest API
const formSchema = z.object({
  fullName: z.string().min(1, { message: "Nama lengkap wajib diisi." }),
  street: z.string().min(1, {
    message: "Alamat lengkap (jalan, nomor rumah, RT/RW) wajib diisi.",
  }), // Disesuaikan dari 'address'
  city: z.string().min(1, { message: "Kota/Kabupaten wajib diisi." }),
  province: z.string().min(1, { message: "Provinsi wajib diisi." }), // Baru, sesuai API
  postalCode: z.string().min(1, { message: "Kode pos wajib diisi." }), // Disesuaikan dari 'postCode'
  phoneNumber: z
    .string()
    .min(10, { message: "Nomor telepon tidak valid (min. 10 digit)." })
    .max(15, { message: "Nomor telepon tidak valid (max. 15 digit)." }),
  email: z
    .string()
    .email({ message: "Format email tidak valid." })
    .min(1, { message: "Email wajib diisi." }), // Baru, sesuai API
  notes: z.string().optional().nullable(), // Opsional dan bisa null
});

const CheckoutClient: React.FC<CheckoutClientProps> = ({
  cartItems,
  cartTotalPrice,
  totalProduct,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { user } = useSelector(selectUserAuthStatus);

  // Inisialisasi form dengan react-hook-form dan zodResolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      street: "",
      city: "",
      province: "",
      postalCode: "",
      phoneNumber: "",
      email: "",
      notes: null, // Default untuk opsional/nullable
    },
  });

  // Handler saat form disubmit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitError(null);

    // Validasi sederhana untuk userId (penting!)
    if (!user?._id || cartItems.length === 0) {
      setSubmitError(
        "Informasi pengguna atau keranjang tidak valid. Mohon periksa kembali."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // Siapkan objek shippingAddress sesuai dengan tipe ShippingAddressRequest
      const shippingAddress: ShippingAddressRequest = {
        fullName: values.fullName,
        street: values.street,
        city: values.city,
        province: values.province,
        postalCode: values.postalCode,
        phoneNumber: values.phoneNumber,
        email: values.email,
      };

      // Metode pembayaran bisa dipilih dari UI, untuk contoh ini kita hardcode
      const paymentMethod = "Bank Transfer (Simulasi)";

      const response = await createOrder({
        userId: user?._id as string,
        shippingAddress,
        paymentMethod,
        notes: values.notes || "", // Pastikan mengirim string kosong jika notes null/undefined
      });

      if (response.success) {
        alert("Pesanan berhasil dibuat!");
        router.push(`/order/${response.order.orderId}`); // Redirect ke halaman detail order
        // TODO: Anda mungkin ingin melakukan dispatch Redux action untuk mengosongkan keranjang di sini
      } else {
        setSubmitError(response.message || "Gagal membuat pesanan.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setSubmitError(
        "Terjadi kesalahan saat memproses pesanan Anda. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Helper function untuk memformat harga
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

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
          <Form {...form}>
            {/* Beri ID pada form agar tombol submit di luar form bisa terhubung */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
              id="checkout-form"
            >
              <FormField
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                control={form.control}
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
                control={form.control}
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
            onClick={form.handleSubmit(onSubmit)} // Panggil handleSubmit dari form
            disabled={isSubmitting || cartItems.length === 0} // Nonaktifkan saat submit atau keranjang kosong
          >
            {isSubmitting ? "Memproses Order..." : "Order Sekarang"}
          </Button>
          {submitError && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {submitError}
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
