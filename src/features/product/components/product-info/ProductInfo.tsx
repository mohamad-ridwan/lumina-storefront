import { Shoe } from "@/types/shoes";
import { ProductInfoWrapper } from "./ProductInfoWrapper";

/**
 * @fileoverview Product Info Component
 * This component displays detailed product information including name, price,
 * description, variant selection (using buttons), quantity input, and fixed action buttons.
 */

/**
 * Props untuk komponen ProductInfo.
 */
export interface ProductInfoProps {
  shoe: Shoe; // Objek sepatu lengkap
  selectedOptionsParams?: Record<string, string>;
  quantityParams?: number | null;
}

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
