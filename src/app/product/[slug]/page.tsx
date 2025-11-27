import ContainerPage from "@/shared/components/ContainerPage";
import Link from "next/link";
import { getProductDetail } from "@/core/usecases/product";
import { loadThemeComponent } from "@/shared/lib/Theme";
import { getTheme } from "@/core/infrastructure/services/api/theme";
import { AppProductProps } from "@/core/domain/product";

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
  const {
    breadcrumbItems,
    shoe,
    allProductImages,
    quantityParams,
    selectedOptions,
  } = await getProductDetail({ params, searchParams });

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

  const theme = await getTheme();
  const Product = await loadThemeComponent<AppProductProps>(theme, "Product");

  return (
    <Product
      breadcrumbItems={breadcrumbItems}
      allProductImages={allProductImages}
      shoe={shoe}
      quantityParams={quantityParams}
      selectedOptions={selectedOptions}
      theme={theme}
    />
  );
};

export default ProductDetail;
