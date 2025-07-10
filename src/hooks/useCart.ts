"use client";

import { useState, useCallback } from "react";
import { CartItem, GetCartResponse } from "@/types/cart";
import { updateCartQuantity } from "@/services/api/cart/updateCartQuantity";
import { removeFromCart } from "@/services/api/cart/removeFromCart";

export interface UseCartReturn {
  isUpdating: boolean;
  updateQuantity: (
    shoeId: string,
    selectedVariantId: string | null,
    newQuantity: number,
    availableStock: number
  ) => Promise<void>;
  removeItem: (shoeId: string) => Promise<void>;
  updateCartItems: (updatedItems: CartItem[], cartTotalPrice: number) => void;
}

export function useCart(
  initialCartItems: CartItem[],
  userId: string,
  onCartUpdate?: (updatedItems: CartItem[], newTotal: number) => void
): UseCartReturn {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateCartItems = useCallback(
    (updatedItems: CartItem[], cartTotalPrice: number) => {
      onCartUpdate?.(updatedItems, cartTotalPrice);
    },
    [onCartUpdate]
  );

  const updateQuantity = useCallback(
    async (
      shoeId: string,
      selectedVariantId: string | null,
      newQuantity: number,
      availableStock: number
    ) => {
      if (newQuantity > availableStock) {
        throw new Error(
          `Quantity tidak boleh melebihi stock yang tersedia (${availableStock})`
        );
      }

      if (newQuantity < 1) {
        throw new Error("Quantity minimal adalah 1");
      }

      setIsUpdating(true);
      try {
        const resultUpdate: GetCartResponse = await updateCartQuantity({
          userId,
          shoeId,
          selectedVariantId,
          quantity: newQuantity,
        });

        // Update local state
        // const updatedItems = initialCartItems.map((item) =>
        //   item._id === shoeId
        //     ? {
        //         ...item,
        //         quantity: newQuantity,
        //         subtotal: item.price * newQuantity,
        //       }
        //     : item
        // );

        updateCartItems(resultUpdate.cartItems, resultUpdate.cartTotalPrice);
      } catch (error) {
        console.error("Error updating quantity:", error);
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [userId, initialCartItems, updateCartItems]
  );

  const removeItem = useCallback(
    async (cartId: string) => {
      setIsUpdating(true);
      try {
        const result: GetCartResponse = await removeFromCart({
          userId,
          cartId,
        });

        // Update local state
        // const updatedItems = initialCartItems.filter(
        //   (item) => item._id !== cartId
        // );
        updateCartItems(result.cartItems, result.cartTotalPrice);
      } catch (error) {
        console.error("Error removing item:", error);
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [userId, initialCartItems, updateCartItems]
  );

  return {
    isUpdating,
    updateQuantity,
    removeItem,
    updateCartItems,
  };
}
