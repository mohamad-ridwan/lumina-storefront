import { AppProductProps, Shoe } from "@/core/domain/product";
import ProductImageDesktop from "@/themes/theme1/features/product/ProductImageDesktop";
import ProductImageMobile from "@/themes/theme1/features/product/ProductImageMobile";
import ProductInfo from "@/features/product/components/ProductInfo";
import CustomBreadcrumb from "@/shared/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/shared/components/ContainerPage";

const Product = ({
  breadcrumbItems,
  allProductImages,
  shoe,
  quantityParams,
  selectedOptions,
  theme,
}: AppProductProps) => {
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
            shoe={shoe as Shoe}
            quantityParams={quantityParams}
            selectedOptionsParams={selectedOptions}
            theme={theme}
          />
        </div>
      </div>
    </ContainerPage>
  );
};

export default Product;
