import { Shoe } from "@/types/shoes";
import WrapperSection from "../WrapperSection";
import ProductLists from "@/components/ProductLists";
import { Pagination } from "@/types/pagination";
import BasePagination from "@/components/pagination/BasePagination";

interface Props {
  title: string;
  shoes: Shoe[];
  pagination: Pagination;
}

const CategoryClient = ({ title, shoes, pagination }: Props) => {
  return (
    <WrapperSection title={title}>
      <ProductLists shoes={shoes} />
      <div className="pt-4">
        <BasePagination pagination={pagination} />
      </div>
    </WrapperSection>
  );
};

export default CategoryClient;
