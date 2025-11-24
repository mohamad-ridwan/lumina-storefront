import { AppProductProps, Shoe } from "@/core/domain/product";
import ProductImageDesktop from "@/features/product/components/ProductImageDesktop";
import ProductImageMobile from "@/features/product/components/ProductImageMobile";
import ProductInfo from "@/themes/theme2/features/product/ProductInfo";
import CustomBreadcrumb from "@/shared/components/breadcrumbs/CustomBreadcrumb";

/**
 * @fileoverview Product Container Component - Sportie Theme
 * This component displays the product detail page with a sporty layout design.
 */

const Product = ({
  breadcrumbItems,
  allProductImages,
  shoe,
  quantityParams,
  selectedOptions,
}: AppProductProps) => {
  return (
    <>
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
            shoe={shoe as Shoe}
            quantityParams={quantityParams}
            selectedOptionsParams={selectedOptions}
          />
        </div>
      </div>
    </>
  );
};

export default Product;

