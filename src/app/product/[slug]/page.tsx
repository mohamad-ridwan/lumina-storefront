import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb"; // Pastikan path ini benar
import ContainerPage from "@/container/ContainerPage"; // Pastikan path ini benar
import ProductImageDesktop from "@/sections/product/ProductImageDesktop";
import ProductImageMobile from "@/sections/product/ProductImageMobile";
import ProductInfo from "@/sections/product/ProductInfo";
import { getShoe } from "@/services/api/shoes/getShoe"; // Pastikan path ini benar
import { Shoe, ShoesResponse } from "@/types/shoes"; // Impor tipe Shoe dan ShoesResponse

/**
 * @fileoverview Product Detail Page
 * This server component fetches product data and displays it using
 * a responsive grid layout with separate image carousel and info components.
 */

// Komponen ProductDetail (Server Component)
const ProductDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>; // params langsung berupa objek, tidak perlu Promise
}) => {
  const { slug } = await params; // Langsung akses slug dari params

  let shoe: Shoe | null = null;
  try {
    const shoeData: ShoesResponse = await getShoe({ slug });
    if (shoeData.success && shoeData.shoes && shoeData.shoes.length > 0) {
      shoe = shoeData.shoes[0];
    } else {
      console.error(
        "Produk tidak ditemukan atau gagal mengambil data:",
        shoeData.message
      );
      // Tangani kasus produk tidak ditemukan, misalnya dengan redirect atau menampilkan pesan error
      // return <div>Produk tidak ditemukan.</div>; // Contoh sederhana
    }
  } catch (error) {
    console.error("Error fetching shoe data:", error);
    // Tangani error fetch, misalnya dengan menampilkan pesan error generik
    // return <div>Terjadi kesalahan saat memuat produk.</div>; // Contoh sederhana
  }

  // Jika produk tidak ditemukan setelah fetch
  if (!shoe) {
    return (
      <ContainerPage>
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Produk tidak ditemukan.
          </h2>
          <p className="text-muted-foreground">
            Mohon maaf, produk yang Anda cari tidak tersedia.
          </p>
          {/* <Link href="/" className="mt-6 text-custom-blue hover:underline">
            Kembali ke Beranda
          </Link> */}
        </div>
      </ContainerPage>
    );
  }

  // Siapkan data breadcrumb
  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    {
      href: `/categories/${shoe.category[0]?.slug || "#"}`,
      label: shoe.category[0]?.name || "Kategori",
    }, // Ambil kategori pertama
    { href: `/product/${shoe.slug}`, label: shoe.name, isCurrent: true },
  ];

  // Kumpulkan semua URL gambar untuk carousel
  const allProductImages = [
    shoe.image, // Gambar utama
    ...(shoe.variants || []).map((variant) => variant.imageUrl), // Gambar dari varian
  ].filter(Boolean) as string[]; // Filter out any null/undefined values

  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Sisi Kiri: Gambar Produk (2/5 lebar di desktop) */}
        <div className="lg:col-span-2">
          <ProductImageDesktop images={allProductImages} />
          <ProductImageMobile images={allProductImages} />
        </div>

        {/* Sisi Kanan: Informasi Produk (3/5 lebar di desktop) */}
        <div className="lg:col-span-3">
          <ProductInfo shoe={shoe} />
        </div>
      </div>
    </ContainerPage>
  );
};

export default ProductDetail;
