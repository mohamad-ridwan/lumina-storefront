/**
 * @fileoverview Cart Domain Entities
 * Core domain models for shopping cart functionality
 */

/**
 * Value object for variant option values
 */
export interface VariantOptionValues {
  readonly [key: string]: string;
}

/**
 * Cart item entity
 */
export interface CartItem {
  readonly _id: string;
  readonly shoeId: string | null;
  readonly name: string;
  readonly image: string | null;
  readonly price: number;
  readonly quantity: number;
  readonly subtotal: number;
  readonly availableStock: number;
  readonly selectedVariantId: string | null;
  readonly variantOptionValues: VariantOptionValues | null;
  readonly variantSku: string | null;
  readonly slug: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

/**
 * Cart aggregate root
 */
export interface Cart {
  readonly items: readonly CartItem[];
  readonly totalUniqueItems: number;
  readonly totalPrice: number;
  readonly totalQuantity: number;
  readonly userId: string;
}

/**
 * Add to cart command
 */
export interface AddToCartCommand {
  readonly userId: string;
  readonly shoeId: string;
  readonly selectedVariantId: string | null;
  readonly quantity: number;
}

/**
 * Update cart quantity command
 */
export interface UpdateCartQuantityCommand {
  readonly userId: string;
  readonly shoeId: string;
  readonly selectedVariantId: string | null;
  readonly quantity: number;
}

/**
 * Remove from cart command
 */
export interface RemoveFromCartCommand {
  readonly userId: string;
  readonly cartId: string;
}