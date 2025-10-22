/**
 * @fileoverview Category Repository
 * Infrastructure layer for category data access
 */

import { httpClient } from '../services/httpClient';

export interface CategoryRepository {
  getCategories(params: { level?: string }): Promise<any[]>;
}

interface ApiCategoryResponse {
  success: boolean;
  message: string;
  categories: any[];
}

class HttpCategoryRepository implements CategoryRepository {
  async getCategories(params: { level?: string }): Promise<any[]> {
    const queryParams = new URLSearchParams();
    if (params.level) {
      queryParams.append('level', params.level);
    }
    
    const url = queryParams.toString() 
      ? `/api/categories?${queryParams.toString()}`
      : '/api/categories';
    
    const response = await httpClient.get<ApiCategoryResponse>(url);
    return response.data.categories;
  }
}

const categoryRepository = new HttpCategoryRepository();

// Export function for backward compatibility
export const fetchCategories = (params: { level?: string }) => {
  return categoryRepository.getCategories(params);
};

export { categoryRepository };