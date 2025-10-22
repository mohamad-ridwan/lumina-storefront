/**
 * @fileoverview Get Product by Slug Use Case
 * Business logic for retrieving a product by its slug
 */

import { Product } from '@/core/domain/product';
import { productRepository } from '@/core/infrastructure/repositories/productRepository';

export interface GetProductBySlugUseCase {
  execute(slug: string): Promise<Product>;
}

class GetProductBySlugUseCaseImpl implements GetProductBySlugUseCase {
  async execute(slug: string): Promise<Product> {
    if (!slug || slug.trim().length === 0) {
      throw new Error('Product slug is required');
    }

    try {
      return await productRepository.getBySlug(slug);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get product: ${error.message}`);
      }
      throw new Error('Failed to get product: Unknown error');
    }
  }
}

export const getProductBySlugUseCase = new GetProductBySlugUseCaseImpl();