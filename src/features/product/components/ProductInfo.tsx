import { loadThemeComponent } from "@/shared/lib/Theme";
import { ProductInfoProps } from "@/core/domain/product";

/**
 * @fileoverview Product Info Component
 * This component displays detailed product information including name, price,
 * description, variant selection (using buttons), quantity input, and fixed action buttons.
 */

/**
 * Props untuk komponen ProductInfo.
 */

const ProductInfo: React.FC<ProductInfoProps> = async ({
  shoe,
  selectedOptionsParams,
  quantityParams,
  theme,
}) => {
  const ProductInfo = await loadThemeComponent<ProductInfoProps>(
    theme as string,
    "ProductInfo"
  );
  return (
    <ProductInfo
      shoe={shoe}
      selectedOptionsParams={selectedOptionsParams}
      quantityParams={quantityParams}
    />
  );
};

export default ProductInfo;
