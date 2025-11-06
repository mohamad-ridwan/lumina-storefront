import { User, LoginResponse } from "../domain/user";
import { userRepositoryImpl } from "../infrastructure/repositories/impl/user";

const {
  loginUser: loginUserRepo,
  getUserProfile: getUserProfileRepo,
} = userRepositoryImpl;

export const loginUser = async (credentials: {
  username: string;
  password: string;
  phoneNumber: string;
}): Promise<LoginResponse> => {
  return await loginUserRepo(credentials);
};

export const getUserProfile = async (token: string): Promise<User> => {
  return await getUserProfileRepo(token);
};
