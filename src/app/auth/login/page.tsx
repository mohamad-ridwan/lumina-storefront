import { checkAuthAndRedirectIfLoggedIn } from "@/lib/auth-validation";
import LoginPageClient from "@/sections/auth/login/LoginPageClient";

// Force dynamic rendering for auth validation
export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  // Check if user is already logged in and redirect to home if they are
  await checkAuthAndRedirectIfLoggedIn('/');

  return <LoginPageClient />;
}