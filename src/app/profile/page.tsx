import { getTheme } from "@/core/infrastructure/services/api/theme";
import { requireAuth } from "@/lib/auth-validation";
import { loadThemeComponent } from "@/shared/lib/Theme";
import { ProfilePageClientProps } from "@/shared/types/users";

// Force dynamic rendering for auth validation
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  // Server-side authentication validation using cookie token
  const { user, token } = await requireAuth("/profile");

  const theme = await getTheme();
  const ProfilePageClient = await loadThemeComponent<ProfilePageClientProps>(
    theme,
    "ProfilePageClient"
  );

  return <ProfilePageClient user={user} token={token} />;
}
