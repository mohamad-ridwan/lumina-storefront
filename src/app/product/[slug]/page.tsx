import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb"; // Pastikan path ini benar
import ContainerPage from "@/container/ContainerPage"; // Pastikan path ini benar
import ProductImageDesktop from "@/sections/product/ProductImageDesktop";
import ProductImageMobile from "@/sections/product/ProductImageMobile";
import ProductInfo from "@/sections/product/ProductInfo";
import { getShoe } from "@/services/api/shoes/getShoe"; // Pastikan path ini benar
import { Shoe, ShoesResponse } from "@/types/shoes"; // Impor tipe Shoe dan ShoesResponse
import { ActiveProductImg } from "@/types/store/product";
import Link from "next/link";

/**
 * @fileoverview Product Detail Page
 * This server component fetches product data and displays it using
 * a responsive grid layout with separate image carousel and info components.
 */

// Komponen ProductDetail (Server Component)
const ProductDetail = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { slug } = await params;
  const { variant, quantity } = await searchParams;

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
    }
  } catch (error) {
    console.error("Error fetching shoe data:", error);
  }

  let selectedOptions: Record<string, string> = {};
  let quantityParams: number | null = null;

  if (variant && shoe?.variants && shoe.variants.length > 0) {
    const currentVariant = shoe.variants.find((v) => v._id === variant);
    if (currentVariant) {
      selectedOptions = currentVariant.optionValues;
    }
  }
  if (quantity && typeof Number(quantity) === "number") {
    quantityParams = Number(quantity);
  }

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
          <Link href="/" className="mt-6 text-custom-blue hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      </ContainerPage>
    );
  }

  // Siapkan data breadcrumb
  const breadcrumbItems: {
    href: string;
    label: string;
    isCurrent?: boolean;
    hasDropdown?: boolean;
    dropdownItems?: { href: string; label: string }[];
  }[] = [{ href: "/", label: "Beranda" }];

  const mainCategories = shoe.category;
  const numMainCategories = mainCategories.length;

  mainCategories.forEach((cat) => {
    // Jika hanya ada SATU kategori utama DAN kategori tersebut memiliki sub-kategori
    if (
      numMainCategories === 1 &&
      cat.subCategories &&
      cat.subCategories.length > 0
    ) {
      // Tambahkan kategori utama
      breadcrumbItems.push({
        href: `/${cat.level === 0 ? "c1" : "c2"}/${cat.slug}`,
        label: cat.name,
      });
      // Kemudian tambahkan semua sub-kategori secara sejajar
      cat.subCategories.forEach((subCategory) => {
        // Menggunakan subCategory
        breadcrumbItems.push({
          href: `/${subCategory.level === 0 ? "c1" : "c2"}/${subCategory.slug}`,
          label: subCategory.name,
        }); // Menggunakan subCategory.slug dan subCategory.name
      });
    } else {
      // Jika ada BANYAK kategori utama, ATAU hanya satu kategori utama tapi tanpa sub-kategori
      // Tambahkan kategori utama
      breadcrumbItems.push({
        href: `/${cat.level === 0 ? "c1" : "c2"}/${cat.slug}`,
        label: cat.name,
        // Jika ada banyak kategori utama DAN kategori ini memiliki sub-kategori,
        // maka aktifkan dropdown untuk kategori ini.
        hasDropdown:
          numMainCategories > 1 &&
          cat.subCategories &&
          cat.subCategories.length > 0, // Menggunakan subCategories
        dropdownItems:
          cat.subCategories?.map((subCategory) => ({
            href: `/${subCategory.level === 0 ? "c1" : "c2"}/${
              subCategory.slug
            }`,
            label: subCategory.name,
          })) || [], // Menggunakan subCategory
      });
    }
  });

  // Tambahkan produk itu sendiri sebagai item saat ini
  breadcrumbItems.push({
    href: `/product/${shoe.slug}`,
    label: shoe.name,
    isCurrent: true,
  });

  const allProductImages = [
    { _id: shoe._id, imageUrl: shoe.image },
    ...(shoe.variants || []).map((variant) => ({
      _id: variant._id,
      imageUrl: variant.imageUrl,
    })),
  ].filter(Boolean) as ActiveProductImg[];

  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Sisi Kiri: Gambar Produk (2/5 lebar di desktop) */}
        <div className="lg:col-span-2">
          {/* Tampilan Mobile: Carousel */}
          <div className="lg:hidden">
            <ProductImageMobile images={allProductImages} />
          </div>
          {/* Tampilan Desktop: Single Image + Thumbnail Carousel */}
          <div className="hidden lg:block">
            <ProductImageDesktop images={allProductImages} />
          </div>
        </div>

        {/* Sisi Kanan: Informasi Produk (3/5 lebar di desktop) */}
        <div className="lg:col-span-3">
          <ProductInfo
            shoe={shoe}
            quantityParams={quantityParams}
            selectedOptionsParams={selectedOptions}
          />
        </div>
      </div>
    </ContainerPage>
  );
};

export default ProductDetail;
