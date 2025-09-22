import { checkAuthAndRedirectIfLoggedIn } from "@/lib/auth-validation";
import RegisterPageClient from "@/sections/auth/register/RegisterPageClient";

// Force dynamic rendering for auth validation
export const dynamic = 'force-dynamic';

export default async function RegisterPage() {
  // Check if user is already logged in and redirect to home if they are
  await checkAuthAndRedirectIfLoggedIn('/');

  return <RegisterPageClient />;
}