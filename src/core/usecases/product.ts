import {
  AppProductProps,
  ProductDetailParams,
  Shoe,
  ShoeQuery,
  ShoesResponse,
} from "@/core/domain/product";
import { productRepositoryImpl } from "@/core/infrastructure/repositories/impl/product";
import { ActiveProductImg } from "@/shared/types/product";

const { getShoe: getShoeRepo } = productRepositoryImpl;

export const getShoe = async (query: ShoeQuery): Promise<ShoesResponse> => {
  return await getShoeRepo(query);
};

export const getProductDetail = async ({
  params,
  searchParams,
}: ProductDetailParams): Promise<AppProductProps> => {
  const { slug } = await params;
  const { variant, quantity } = await searchParams;

  let shoe: Shoe | null = null;

  let selectedOptions: Record<string, string> = {};
  let quantityParams: number | null = null;
  let allProductImages: ActiveProductImg[] = [];
  let breadcrumbItems: {
    href: string;
    label: string;
    isCurrent?: boolean;
    hasDropdown?: boolean;
    dropdownItems?: { href: string; label: string }[];
  }[] = [{ href: "/", label: "Beranda" }];

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

  if (variant && shoe?.variants && shoe.variants.length > 0) {
    const currentVariant = shoe.variants.find((v) => v._id === variant);
    if (currentVariant) {
      selectedOptions = currentVariant.optionValues;
    }
  }
  if (quantity && typeof Number(quantity) === "number") {
    quantityParams = Number(quantity);
  }

  if (shoe) {
    // Siapkan data breadcrumb
    breadcrumbItems = [{ href: "/", label: "Beranda" }];

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
            href: `/${subCategory.level === 0 ? "c1" : "c2"}/${
              subCategory.slug
            }`,
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

    allProductImages = [
      { _id: shoe._id, imageUrl: shoe.image },
      ...(shoe.variants || []).map((variant) => ({
        _id: variant._id,
        imageUrl: variant.imageUrl,
      })),
    ].filter(Boolean) as ActiveProductImg[];
  }

  return {
    shoe: shoe,
    breadcrumbItems,
    allProductImages,
    quantityParams,
    selectedOptions,
  };
};
