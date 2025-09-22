import { requireAuth } from "@/lib/auth-validation";
import ProfilePageClient from "@/sections/profile/ProfilePageClient";

// Force dynamic rendering for auth validation
export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  // Server-side authentication validation using cookie token
  const { user, token } = await requireAuth("/profile");

  return <ProfilePageClient user={user} token={token} />;
}