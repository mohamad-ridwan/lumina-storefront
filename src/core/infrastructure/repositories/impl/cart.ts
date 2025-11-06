import { CartRepository } from "../cart";
import { GetCartResponse } from "@/core/domain/cart";
import { fetchCart } from "../../services/api/cart/getCart";
import { addCart } from "../../services/api/cart/addCart";
import { updateCartQuantity } from "../../services/api/cart/updateCartQuantity";
import { removeFromCart } from "../../services/api/cart/removeFromCart";

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
