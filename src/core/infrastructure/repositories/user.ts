import { User, LoginResponse } from "@/core/domain/user";

export interface UserRepository {
  loginUser(credentials: {
    username: string;
    password: string;
    phoneNumber: string;
  }): Promise<LoginResponse>;
  getUserProfile(token: string): Promise<User>;
  setUserSession(token: string): void;
  getUserSession(): string | undefined;
  removeUserSession(): void;
}
