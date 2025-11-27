import { User } from "@/core/domain/user";

export interface ProfilePageClientProps {
  user: User;
  token: string;
}
