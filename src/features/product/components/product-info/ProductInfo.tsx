import { ProductInfoWrapper } from "./ProductInfoWrapper";
import { ProductInfoProps } from "@/core/domain/product";

/**
 * @fileoverview Product Info Component
 * This component displays detailed product information including name, price,
 * description, variant selection (using buttons), quantity input, and fixed action buttons.
 */

/**
 * Props untuk komponen ProductInfo.
 */

const ProductInfo: React.FC<ProductInfoProps> = ({
  shoe,
  selectedOptionsParams,
  quantityParams,
}) => {
  return (
    <ProductInfoWrapper
      shoe={shoe}
      selectedOptionsParams={selectedOptionsParams}
      quantityParams={quantityParams}
    />
  );
};

export default ProductInfo;
