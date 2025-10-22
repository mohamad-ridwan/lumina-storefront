/**
 * @fileoverview Search Products Use Case
 * Business logic for searching and filtering products
 */

import { ProductCollection, ProductSearchCriteria } from '@/core/domain/product';
import { productRepository } from '@/core/infrastructure/repositories/productRepository';

export interface SearchProductsUseCase {
  execute(criteria: ProductSearchCriteria): Promise<ProductCollection>;
}

class SearchProductsUseCaseImpl implements SearchProductsUseCase {
  async execute(criteria: ProductSearchCriteria): Promise<ProductCollection> {
    // Validate search criteria
    this.validateSearchCriteria(criteria);

    try {
      return await productRepository.search(criteria);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to search products: ${error.message}`);
      }
      throw new Error('Failed to search products: Unknown error');
    }
  }

  private validateSearchCriteria(criteria: ProductSearchCriteria): void {
    if (criteria.minPrice && criteria.minPrice < 0) {
      throw new Error('Minimum price cannot be negative');
    }

    if (criteria.maxPrice && criteria.maxPrice < 0) {
      throw new Error('Maximum price cannot be negative');
    }

    if (criteria.minPrice && criteria.maxPrice && criteria.minPrice > criteria.maxPrice) {
      throw new Error('Minimum price cannot be greater than maximum price');
    }

    if (criteria.page && criteria.page < 1) {
      throw new Error('Page number must be greater than 0');
    }

    if (criteria.limit && criteria.limit < 1) {
      throw new Error('Limit must be greater than 0');
    }

    if (criteria.limit && criteria.limit > 100) {
      throw new Error('Limit cannot exceed 100 items per page');
    }
  }
}

export const searchProductsUseCase = new SearchProductsUseCaseImpl();