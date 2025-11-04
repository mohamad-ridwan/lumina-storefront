import { User } from "@/core/domain/user";

export interface UserRepository {
  getUserProfile(token: string): Promise<User>;
  setUserSession(token: string): void;
  getUserSession(): string | undefined;
  removeUserSession(): void;
}
