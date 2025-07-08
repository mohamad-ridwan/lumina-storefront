import { Shoe } from "@/types/shoes";
import WrapperSection from "../WrapperSection";
import ProductLists from "@/components/ProductLists";
import BasePagination from "@/components/pagination/BasePagination";
import { Pagination } from "@/types/pagination";

interface ProductListsProps {
  shoes: Shoe[];
  label: string;
  pagination: Pagination;
}

const ProductContent = ({ shoes, label, pagination }: ProductListsProps) => {
  return (
    <WrapperSection title={label}>
      <ProductLists shoes={shoes} />
      <div className="pt-4">
        <BasePagination pagination={pagination} />
      </div>
    </WrapperSection>
  );
};

export default ProductContent;
