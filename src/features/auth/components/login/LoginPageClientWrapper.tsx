import { ThemeComponent } from "@/shared/lib/Theme";

export const LoginPageClientWrapper = async () => {
  const Component = await ThemeComponent("LoginPageClient");

  return <Component />;
};
