import { Shoe } from "@/types/shoes";
import { Pagination } from "@/types/pagination";
import { loadThemeComponent } from "@/shared/lib/Theme";

interface ProductContentProps {
  shoes: Shoe[];
  label: string;
  pagination: Pagination;
  sortParams?: string;
  theme: string;
}

const ProductContent = async ({
  shoes,
  label,
  pagination,
  sortParams,
  theme,
}: ProductContentProps) => {
  const ProductContent = await loadThemeComponent<ProductContentProps>(
    theme,
    "ProductContent"
  );
  return (
    <ProductContent
      shoes={shoes}
      label={label}
      pagination={pagination}
      sortParams={sortParams}
      theme={theme}
    />
  );
};

export default ProductContent;
