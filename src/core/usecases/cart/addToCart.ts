/**
 * @fileoverview Add to Cart Use Case
 * Business logic for adding items to shopping cart
 */

import { AddToCartCommand } from '@/core/domain/cart';
import { cartRepository } from '@/core/infrastructure/repositories/cartRepository';
import { productRepository } from '@/core/infrastructure/repositories/productRepository';

export interface AddToCartUseCase {
  execute(command: AddToCartCommand): Promise<void>;
}

class AddToCartUseCaseImpl implements AddToCartUseCase {
  async execute(command: AddToCartCommand): Promise<void> {
    // Validate command
    this.validateCommand(command);

    try {
      // Verify product exists and has sufficient stock
      const product = await productRepository.getById(command.shoeId);
      
      if (command.selectedVariantId) {
        const variant = product.variants.find(v => v._id === command.selectedVariantId);
        if (!variant) {
          throw new Error('Selected variant not found');
        }
        if (variant.stock < command.quantity) {
          throw new Error(`Insufficient stock. Available: ${variant.stock}, Requested: ${command.quantity}`);
        }
      } else {
        if (product.stock < command.quantity) {
          throw new Error(`Insufficient stock. Available: ${product.stock}, Requested: ${command.quantity}`);
        }
      }

      // Add to cart
      await cartRepository.addItem(command);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to add item to cart: Unknown error');
    }
  }

  private validateCommand(command: AddToCartCommand): void {
    if (!command.userId || command.userId.trim().length === 0) {
      throw new Error('User ID is required');
    }

    if (!command.shoeId || command.shoeId.trim().length === 0) {
      throw new Error('Product ID is required');
    }

    if (!command.quantity || command.quantity < 1) {
      throw new Error('Quantity must be at least 1');
    }

    if (command.quantity > 99) {
      throw new Error('Quantity cannot exceed 99 items');
    }
  }
}

export const addToCartUseCase = new AddToCartUseCaseImpl();