import { ThemeComponent } from "@/shared/lib/Theme";
import { ProductInfoProps } from "./ProductInfo";

export const ProductInfoWrapper = async ({ ...props }: ProductInfoProps) => {
  const Component = await ThemeComponent<ProductInfoProps>("ProductInfo");

  return <Component {...props} />;
};
