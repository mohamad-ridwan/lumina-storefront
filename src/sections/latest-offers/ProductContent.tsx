import { Shoe } from "@/types/shoes";
import WrapperSection from "../WrapperSection";
import ProductLists from "@/components/ProductLists";
import BasePagination from "@/components/pagination/BasePagination";
import { Pagination } from "@/types/pagination";
import { Selects } from "@/types/selects";
import { BaseSelect } from "@/components/selects/BaseSelect";

interface ProductListsProps {
  shoes: Shoe[];
  label: string;
  pagination: Pagination;
  sortParams?: string;
}

const ProductContent = ({
  shoes,
  label,
  pagination,
  sortParams,
}: ProductListsProps) => {
  const sortOptions: Selects[] = [
    { type: "item", name: "Termurah", value: "termurah" },
    { type: "item", name: "Termahal", value: "termahal" },
    { type: "item", name: "Terbaru", value: "terbaru" },
  ];
  return (
    <WrapperSection
      title={label}
      titleWithLabel={`(Total ${pagination.total} item)`}
      rightHeader={
        <BaseSelect
          placeholder="Sort by"
          options={sortOptions}
          isActiveSelectedToParams={true}
          toParams="sort"
          defaultValue={sortParams ?? undefined}
        />
      }
    >
      <ProductLists shoes={shoes} />
      <div className="pt-4">
        <BasePagination pagination={pagination} />
      </div>
    </WrapperSection>
  );
};

export default ProductContent;
