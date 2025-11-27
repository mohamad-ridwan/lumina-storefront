import { getTheme } from "@/core/infrastructure/services/api/theme";
import { checkAuthAndRedirectIfLoggedIn } from "@/lib/auth-validation";
import { loadThemeComponent } from "@/shared/lib/Theme";

// Force dynamic rendering for auth validation
export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  // Check if user is already logged in and redirect to home if they are
  await checkAuthAndRedirectIfLoggedIn("/");

  const theme = (await getTheme()) as "theme1" | "theme2";
  const RegisterPageClient = await loadThemeComponent(
    theme,
    "RegisterPageClient"
  );

  return <RegisterPageClient />;
}
