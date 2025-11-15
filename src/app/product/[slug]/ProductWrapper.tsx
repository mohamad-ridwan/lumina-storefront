import { Shoe } from "@/core/domain/product";
import { CustomBreadcrumbItem } from "@/shared/components/breadcrumbs/CustomBreadcrumb";
import { ThemeComponents } from "@/shared/lib/Theme";
import { ActiveProductImg } from "@/shared/types/product";

export type AppProductProps = {
  breadcrumbItems: CustomBreadcrumbItem[];
  allProductImages: ActiveProductImg[];
  shoe: Shoe;
  quantityParams: number | null;
  selectedOptions: Record<string, string>;
};

export const ProductWrapper = ({ ...props }: AppProductProps) => {
  const Component = ThemeComponents<AppProductProps>(`app/Product`);

  return <Component {...props} />;
};
