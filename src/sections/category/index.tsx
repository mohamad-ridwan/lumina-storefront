import { Shoe } from "@/types/shoes";
import WrapperSection from "../WrapperSection";
import ProductLists from "@/components/ProductLists";
import { Pagination } from "@/types/pagination";
import BasePagination from "@/components/pagination/BasePagination";
import { BaseSelect } from "@/components/selects/BaseSelect";
import { Selects } from "@/types/selects";

interface Props {
  title: string;
  shoes: Shoe[];
  pagination: Pagination;
  sortParams?: string;
}

const CategoryClient = ({ title, shoes, pagination, sortParams }: Props) => {
  const sortOptions: Selects[] = [
    { type: "item", name: "Termurah", value: "termurah" },
    { type: "item", name: "Termahal", value: "termahal" },
    { type: "item", name: "Terbaru", value: "terbaru" },
  ];
  return (
    <WrapperSection
      title={title}
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

export default CategoryClient;
