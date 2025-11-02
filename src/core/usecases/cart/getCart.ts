/**
 * @fileoverview Get Cart Use Case
 * Business logic for retrieving user's shopping cart
 */

import { Cart } from '@/core/domain/cart';
import { cartRepository } from '@/core/infrastructure/repositories/cartRepository';

export interface GetCartUseCase {
  execute(userId: string): Promise<Cart>;
}

class GetCartUseCaseImpl implements GetCartUseCase {
  async execute(userId: string): Promise<Cart> {
    if (!userId || userId.trim().length === 0) {
      throw new Error('User ID is required');
    }

    try {
      return await cartRepository.getByUserId(userId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get cart: ${error.message}`);
      }
      throw new Error('Failed to get cart: Unknown error');
    }
  }
}

export const getCartUseCase = new GetCartUseCaseImpl();