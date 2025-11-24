import { ThemeComponent } from "@/shared/lib/Theme";
import { User } from "@/core/domain/user";

interface CartPageClientProps {
  user: User;
  token: string;
}

export const CartPageClientWrapper = async ({ ...props }: CartPageClientProps) => {
  const Component = await ThemeComponent<CartPageClientProps>("CartPageClient");

  return <Component {...props} />;
};


