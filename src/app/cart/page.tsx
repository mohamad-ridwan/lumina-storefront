import { requireAuth } from "@/shared/lib/auth-validation";
import { getTheme } from "@/core/infrastructure/services/api/theme";
import { loadThemeComponent } from "@/shared/lib/Theme";
import { User } from "@/core/domain/user";

// Force dynamic rendering for auth validation
export const dynamic = "force-dynamic";

export interface CartPageClientProps {
  user: User;
  token: string;
}

export default async function CartPage() {
  // Server-side authentication validation using cookie token
  const { user, token } = await requireAuth("/cart");

  const theme = (await getTheme()) as "theme1" | "theme2";
  const CartPageClient = await loadThemeComponent<CartPageClientProps>(
    theme,
    "CartPageClient"
  );
  return <CartPageClient user={user} token={token} />;
}
