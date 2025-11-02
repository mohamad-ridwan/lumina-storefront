/**
 * @fileoverview Remove from Cart Use Case
 * Business logic for removing items from shopping cart
 */

import { RemoveFromCartCommand } from '@/core/domain/cart';
import { cartRepository } from '@/core/infrastructure/repositories/cartRepository';

export interface RemoveFromCartUseCase {
  execute(command: RemoveFromCartCommand): Promise<void>;
}

class RemoveFromCartUseCaseImpl implements RemoveFromCartUseCase {
  async execute(command: RemoveFromCartCommand): Promise<void> {
    // Validate command
    this.validateCommand(command);

    try {
      await cartRepository.removeItem(command);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to remove item from cart: ${error.message}`);
      }
      throw new Error('Failed to remove item from cart: Unknown error');
    }
  }

  private validateCommand(command: RemoveFromCartCommand): void {
    if (!command.userId || command.userId.trim().length === 0) {
      throw new Error('User ID is required');
    }

    if (!command.cartId || command.cartId.trim().length === 0) {
      throw new Error('Cart ID is required');
    }
  }
}

export const removeFromCartUseCase = new RemoveFromCartUseCaseImpl();