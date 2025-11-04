import { User } from "../domain/user";
import { userRepositoryImpl } from "../infrastructure/repositories/impl/user";

const { getUserProfile: getUserProfileRepo } = userRepositoryImpl;

export const getUserProfile = async (token: string): Promise<User> => {
  return await getUserProfileRepo(token);
};
