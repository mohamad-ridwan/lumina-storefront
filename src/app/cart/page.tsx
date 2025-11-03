import { requireAuth } from "@/shared/lib/auth-validation";
import CartPageClient from "@/features/cart/components/CartPageClient";

// Force dynamic rendering for auth validation
export const dynamic = "force-dynamic";

export default async function CartPage() {
  // Server-side authentication validation using cookie token
  const { user, token } = await requireAuth("/cart");

  return <CartPageClient user={user} token={token} />;
}
