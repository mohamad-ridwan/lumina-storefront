import { ProfilePageClientWrapper } from "./ProfilePageClientWrapper";
import { User } from "@/types/user";

interface ProfilePageClientProps {
  user: User;
  token: string;
}

export default function ProfilePageClient({ ...props }: ProfilePageClientProps) {
  return <ProfilePageClientWrapper {...props} />;
}