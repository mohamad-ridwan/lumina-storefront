import { UserRepository } from "../user";
import {
  loginUser as loginUserAPI,
  getUserProfile,
} from "../../services/api/user";
import {
  getClientSessionCookie,
  removeClientSessionCookie,
  setClientSessionCookie,
} from "../../services/storage/user-session";

export const userRepositoryImpl: UserRepository = {
  async loginUser(credentials) {
    return await loginUserAPI(credentials);
  },
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
