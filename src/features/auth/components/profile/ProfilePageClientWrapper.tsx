import { ThemeComponent } from "@/shared/lib/Theme";
import { User } from "@/types/user";

interface ProfilePageClientProps {
  user: User;
  token: string;
}

export const ProfilePageClientWrapper = async ({ ...props }: ProfilePageClientProps) => {
  const Component = await ThemeComponent<ProfilePageClientProps>("ProfilePageClient");

  return <Component {...props} />;
};


