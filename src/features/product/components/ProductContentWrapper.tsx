import { ThemeComponent } from "@/shared/lib/Theme";
import { Shoe } from "@/types/shoes";
import { Pagination } from "@/types/pagination";

interface ProductContentProps {
  shoes: Shoe[];
  label: string;
  pagination: Pagination;
  sortParams?: string;
}

export const ProductContentWrapper = async ({ ...props }: ProductContentProps) => {
  const Component = await ThemeComponent<ProductContentProps>("ProductContent");

  return <Component {...props} />;
};


