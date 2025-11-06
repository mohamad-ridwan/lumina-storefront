import { Category, CategoryQuery } from "@/core/domain/categories";

export interface CategoriesRepository {
  getCategories(query: CategoryQuery): Promise<Category[] | Category>;
}
