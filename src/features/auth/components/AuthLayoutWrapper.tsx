import { ThemeComponent } from "@/shared/lib/Theme";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayoutWrapper = async ({ ...props }: AuthLayoutProps) => {
  const Component = await ThemeComponent<AuthLayoutProps>("AuthLayout");

  return <Component {...props} />;
};


