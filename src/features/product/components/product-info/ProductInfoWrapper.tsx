import { ProductInfoProps } from "@/core/domain/product";
import { ThemeComponent } from "@/shared/lib/Theme";

export const ProductInfoWrapper = async ({ ...props }: ProductInfoProps) => {
  const Component = await ThemeComponent<ProductInfoProps>("ProductInfo");

  return <Component {...props} />;
};
