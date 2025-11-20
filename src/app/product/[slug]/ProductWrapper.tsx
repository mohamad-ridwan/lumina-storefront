import { AppProductProps } from "@/core/domain/product";
import { ThemeComponent } from "@/shared/lib/Theme";

export const ProductWrapper = async ({ ...props }: AppProductProps) => {
  const Component = await ThemeComponent<AppProductProps>("Product");
  return <Component {...props} />;
};
