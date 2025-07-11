"use client";

import React from "react";
import Link from "next/link";
import { CartItem } from "@/types/cart";
import BaseCard from "@/components/card/BaseCard"; // Pastikan path ini benar
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"; // Impor useForm dari react-hook-form
import { zodResolver } from "@hookform/resolvers/zod"; // Impor zodResolver
import * as z from "zod"; // Impor Zod
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Impor komponen Form dari Shadcn
import { Input } from "@/components/ui/input"; // Impor Input dari Shadcn

/**
 * @fileoverview Checkout Client Component
 * This component displays the user's cart items for the checkout process,
 * with a responsive layout featuring an address form and cart review section.
 */

/**
 * Props untuk komponen CheckoutClient.
 */
interface CheckoutClientProps {
  cartItems: CartItem[]; // Array dari item keranjang yang akan ditampilkan
  cartTotalPrice: number; // Total harga semua item di keranjang
  totalProduct: number; // Total jumlah produk (sum of all quantities)
}

// Skema validasi menggunakan Zod
const formSchema = z.object({
  fullName: z.string().min(1, { message: "Nama lengkap wajib diisi." }),
  address: z.string().min(1, { message: "Alamat wajib diisi." }),
  postCode: z.string().min(1, { message: "Kode pos wajib diisi." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Nomor telepon tidak valid." })
    .max(15, { message: "Nomor telepon tidak valid." }),
  city: z.string().min(1, { message: "Kota wajib diisi." }),
  subdistrict: z.string().min(1, { message: "Kelurahan wajib diisi." }),
});

const CheckoutClient: React.FC<CheckoutClientProps> = ({
  cartItems,
  cartTotalPrice,
  totalProduct,
}) => {
  // Inisialisasi form dengan react-hook-form dan zodResolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      address: "",
      postCode: "",
      phoneNumber: "",
      city: "",
      subdistrict: "",
    },
  });

  // Handler saat form disubmit
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Data Alamat:", values);
    // Lanjutkan dengan proses order (misalnya, kirim ke API)
    alert("Pesanan Anda sedang diproses! Lihat detail di console.");
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
        <div className="lg:col-span-2 bg-card rounded-lg">
          <h2 className="font-semibold text-foreground mb-4">
            Detail Pengiriman
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jl. Contoh No. 123, RT/RW"
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
                      <FormLabel>Kota</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: Jakarta Pusat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subdistrict"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kelurahan</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: Tanah Abang" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="postCode"
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
            </form>
          </Form>
        </div>

        {/* Bagian Kanan (lg:col-span-1): Review Keranjang & Ringkasan */}
        <div className="lg:col-span-1 bg-slate-100 p-6 rounded-lg h-fit sticky top-4">
          <h2 className="font-semibold text-foreground mb-4">
            Ringkasan Pesanan
          </h2>

          {/* Daftar Item Keranjang (Review) */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2 mb-4">
            {" "}
            {/* Max height dan scrollable */}
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

                // URL langsung ke halaman produk dengan varian dan kuantitas yang dipilih
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
                      imgHeight={60} // Ukuran gambar lebih kecil
                      imgWidth={60} // Ukuran gambar lebih kecil
                      wrapperCard="flex-row items-center gap-3 p-2 border rounded-lg bg-gray-50" // Padding dan gap lebih kecil
                      wrapperImgClassName="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md" // Ukuran wrapper gambar
                      imageClassName="object-cover w-full h-full"
                      titleClassName="text-sm font-medium text-gray-900 line-clamp-1" // Ukuran font lebih kecil
                      descriptionClassName="text-xs text-gray-600 mt-0.5" // Ukuran font lebih kecil
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
            {/* <div className="flex justify-between">
              <span>Biaya Pengiriman:</span>
              <span>{formatPrice(25000)}</span>
            </div> */}
            <div className="flex justify-between font-bold text-foreground text-sm pt-2 border-t mt-2">
              <span>Total Pembayaran:</span>
              <span>{formatPrice(cartTotalPrice)}</span>{" "}
              {/* Atau cartTotalPrice + shippingCost */}
            </div>
          </div>

          {/* Tombol Submit Order */}
          <Button
            type="submit" // Tipe submit agar terhubung dengan form
            form="checkout-form" // ID form yang akan disubmit
            className="w-full mt-6 text-white py-3 rounded-md font-semibold cursor-pointer"
            onClick={form.handleSubmit(onSubmit)} // Panggil handleSubmit dari form
          >
            Order Sekarang
          </Button>
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
