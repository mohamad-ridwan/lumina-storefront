import { CartRepository } from "../cart";
import { GetCartResponse } from "@/core/domain/cart";
import {
  addCart,
  fetchCart,
  removeFromCart,
  updateCartQuantity,
} from "../../services/api/cart";

export const cartRepositoryImpl: CartRepository = {
  async getCart(userId: string): Promise<GetCartResponse> {
    return await fetchCart({ userId });
  },
  async addCart(params): Promise<GetCartResponse> {
    return await addCart(params);
  },
  async updateCartQuantity(params): Promise<GetCartResponse> {
    return await updateCartQuantity(params);
  },
  async removeFromCart(params): Promise<GetCartResponse> {
    return await removeFromCart(params);
  },
};
