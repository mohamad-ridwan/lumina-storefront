import { Category, CategoryQuery } from "../domain/categories";
import { categoriesRepositoryImpl } from "../infrastructure/repositories/impl/categories";

const { getCategories: getCategoriesRepo } = categoriesRepositoryImpl;

export const getCategories = async (
  query: CategoryQuery
): Promise<Category[] | Category> => {
  return await getCategoriesRepo(query);
};
