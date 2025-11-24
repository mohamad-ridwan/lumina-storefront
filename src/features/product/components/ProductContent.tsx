import { ProductContentWrapper } from "./ProductContentWrapper";
import { Shoe } from "@/types/shoes";
import { Pagination } from "@/types/pagination";

interface ProductContentProps {
  shoes: Shoe[];
  label: string;
  pagination: Pagination;
  sortParams?: string;
}

const ProductContent = ({ ...props }: ProductContentProps) => {
  return <ProductContentWrapper {...props} />;
};

export default ProductContent;
