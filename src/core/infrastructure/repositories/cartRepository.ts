/**
 * @fileoverview Cart Repository
 * Infrastructure layer for cart data access
 */

import { Cart, CartItem, AddToCartCommand, UpdateCartQuantityCommand, RemoveFromCartCommand } from '@/core/domain/cart';
import { httpClient } from '../services/httpClient';

export interface CartRepository {
  getByUserId(userId: string): Promise<Cart>;
  addItem(command: AddToCartCommand): Promise<void>;
  updateQuantity(command: UpdateCartQuantityCommand): Promise<void>;
  removeItem(command: RemoveFromCartCommand): Promise<void>;
  clear(userId: string): Promise<void>;
}

interface ApiCartResponse {
  success: boolean;
  message: string;
  cartItems: any[];
  currentCartTotalUniqueItems: number;
  cartTotalPrice: number;
  totalProduct: number;
}

interface ApiCartActionResponse {
  success: boolean;
  message: string;
}

class HttpCartRepository implements CartRepository {
  async getByUserId(userId: string): Promise<Cart> {
    const response = await httpClient.get<ApiCartResponse>(`/api/cart/${userId}`);
    return this.mapToCart(response.data, userId);
  }

  async addItem(command: AddToCartCommand): Promise<void> {
    await httpClient.post<ApiCartActionResponse>('/api/cart/add', {
      userId: command.userId,
      shoeId: command.shoeId,
      selectedVariantId: command.selectedVariantId,
      quantity: command.quantity,
    });
  }

  async updateQuantity(command: UpdateCartQuantityCommand): Promise<void> {
    await httpClient.put<ApiCartActionResponse>('/api/cart/update-quantity', {
      userId: command.userId,
      shoeId: command.shoeId,
      selectedVariantId: command.selectedVariantId,
      quantity: command.quantity,
    });
  }

  async removeItem(command: RemoveFromCartCommand): Promise<void> {
    await httpClient.delete<ApiCartActionResponse>('/api/cart/remove', {
      body: {
        userId: command.userId,
        cartId: command.cartId,
      },
    });
  }

  async clear(userId: string): Promise<void> {
    await httpClient.delete<ApiCartActionResponse>(`/api/cart/clear/${userId}`);
  }

  private mapToCart(data: ApiCartResponse, userId: string): Cart {
    return {
      items: data.cartItems.map(item => this.mapToCartItem(item)),
      totalUniqueItems: data.currentCartTotalUniqueItems,
      totalPrice: data.cartTotalPrice,
      totalQuantity: data.totalProduct,
      userId,
    };
  }

  private mapToCartItem(data: any): CartItem {
    return {
      _id: data._id,
      shoeId: data.shoeId,
      name: data.name,
      image: data.image,
      price: data.price,
      quantity: data.quantity,
      subtotal: data.subtotal,
      availableStock: data.availableStock,
      selectedVariantId: data.selectedVariantId,
      variantOptionValues: data.variantOptionValues,
      variantSku: data.variantSku,
      slug: data.slug,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}

export const cartRepository = new HttpCartRepository();