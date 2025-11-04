import { Category, CategoryQuery } from "@/core/domain/categories";
import { CategoriesRepository } from "../categories";
import { fetchCategories } from "../../services/api/categories";

export const categoriesRepositoryImpl: CategoriesRepository = {
  async getCategories(query: CategoryQuery): Promise<Category[] | Category> {
    return await fetchCategories(query);
  },
};
