/**
 * @fileoverview Shared Cart Types
 * Re-export domain types for use in UI components
 */

export type {
  Cart,
  CartItem,
  VariantOptionValues,
  AddToCartCommand,
  UpdateCartQuantityCommand,
  RemoveFromCartCommand,
} from '@/core/domain/cart';