import { checkAuthAndRedirectIfLoggedIn } from "@/shared/lib/auth-validation";
import { getTheme } from "@/core/infrastructure/services/api/theme";
import { loadThemeComponent } from "@/shared/lib/Theme";

// Force dynamic rendering for auth validation
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  // Check if user is already logged in and redirect to home if they are
  await checkAuthAndRedirectIfLoggedIn("/");

  const theme = await getTheme();
  const LoginPageClient = await loadThemeComponent(theme, "LoginPageClient");

  return <LoginPageClient />;
}
