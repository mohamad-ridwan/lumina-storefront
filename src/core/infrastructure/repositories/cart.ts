import { GetCartResponse } from "@/core/domain/cart";

export interface AddCartRequest {
  userId: string;
  shoeId: string;
  selectedVariantId: string | null;
  quantity: number;
}

export interface UpdateCartQuantityRequest {
  userId: string;
  shoeId: string;
  selectedVariantId: string | null;
  quantity: number;
}

export interface RemoveFromCartRequest {
  userId: string;
  cartId: string;
}

export interface CartRepository {
  getCart(userId: string): Promise<GetCartResponse>;
  addCart(params: AddCartRequest): Promise<GetCartResponse>;
  updateCartQuantity(params: UpdateCartQuantityRequest): Promise<GetCartResponse>;
  removeFromCart(params: RemoveFromCartRequest): Promise<GetCartResponse>;
}











