import { ThemeComponent } from "@/shared/lib/Theme";

export const CartContentWrapper = async () => {
  const Component = await ThemeComponent("CartContent");

  return <Component />;
};
