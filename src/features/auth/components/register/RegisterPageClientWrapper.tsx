import { ThemeComponent } from "@/shared/lib/Theme";

export const RegisterPageClientWrapper = async () => {
  const Component = await ThemeComponent("RegisterPageClient");

  return <Component />;
};
