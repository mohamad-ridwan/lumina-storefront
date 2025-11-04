import { UserRepository } from "../user";
import { getUserProfile } from "@/core/infrastructure/services/api/user";
import {
  getClientSessionCookie,
  removeClientSessionCookie,
  setClientSessionCookie,
} from "../../services/storage/user-session";

export const userRepositoryImpl: UserRepository = {
  async getUserProfile(token: string) {
    return await getUserProfile(token);
  },
  setUserSession(token) {
    return setClientSessionCookie(token);
  },
  getUserSession() {
    return getClientSessionCookie();
  },
  removeUserSession() {
    return removeClientSessionCookie();
  },
};
