import { AppProductProps } from "@/core/domain/product";
import { ThemeComponent } from "@/shared/lib/Theme";

export const ProductWrapper = ({ ...props }: AppProductProps) => {
  const Component = ThemeComponent<AppProductProps>("theme1", "Product");

  return <Component {...props} />;
};
