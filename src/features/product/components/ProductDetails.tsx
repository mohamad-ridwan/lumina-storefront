import ProductImageDesktop from "@/features/product/components/ProductGalleryDesktop";
import ProductGalleryMobile from "@/features/product/components/ProductGalleryMobile";
import ProductInfo from "@/features/product/components/ProductInfo";
import { Shoe } from "@/shared/types/product";
import { ActiveProductImg } from "@/types/store/product";

interface Props {
  allProductImages: ActiveProductImg[];
  shoe: Shoe;
  quantityParams: number | null;
  selectedOptions: Record<string, string>;
}

export const ProductDetails = ({
  allProductImages,
  shoe,
  quantityParams,
  selectedOptions,
}: Props) => {
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
      {/* Sisi Kiri: Gambar Produk (2/5 lebar di desktop) */}
      <div className="lg:col-span-2">
        {/* Tampilan Mobile: Carousel */}
        <div className="lg:hidden">
          <ProductGalleryMobile images={allProductImages} />
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
  );
};
