"use client";

import { useState, useCallback } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { CartItem, GetCartResponse } from "@/types/cart";
import { updateCartQuantity } from "@/services/api/cart/updateCartQuantity";
import { removeFromCart } from "@/services/api/cart/removeFromCart";
import { RootState, AppDispatch } from "@/store";
import { addToCartAsync, getCartAsync, clearCartError, resetCart } from "@/store/cart/cartSlice";

// --- ORIGINAL USECARE INTERFACE ---
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

// Original useCart hook implementation (preserving existing logic)
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

// --- NEW REDUX CART HOOKS ---

// Typed hooks for Redux
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// New Redux-based cart hook for global state management
export const useReduxCart = () => {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state) => state.cart);

  // Function untuk menambahkan item ke cart
  const addToCart = useCallback(
    async (params: {
      userId: string;
      shoeId: string;
      selectedVariantId: string | null;
      quantity: number;
    }) => {
      try {
        const result = await dispatch(addToCartAsync(params));
        return result;
      } catch (error) {
        throw error;
      }
    },
    [dispatch]
  );

  // Function untuk mengambil data cart
  const getCart = useCallback(
    async (userId: string) => {
      try {
        const result = await dispatch(getCartAsync(userId));
        return result;
      } catch (error) {
        throw error;
      }
    },
    [dispatch]
  );

  // Function untuk clear error
  const clearError = useCallback(() => {
    dispatch(clearCartError());
  }, [dispatch]);

  // Function untuk reset cart
  const resetCartState = useCallback(() => {
    dispatch(resetCart());
  }, [dispatch]);

  return {
    // State
    cartItems: cartState.cartItems,
    currentCartTotalUniqueItems: cartState.currentCartTotalUniqueItems,
    cartTotalPrice: cartState.cartTotalPrice,
    isLoading: cartState.isLoading,
    error: cartState.error,
    
    // Actions
    addToCart,
    getCart,
    clearError,
    resetCartState,
  };
};

// Hook untuk hanya menggunakan cart count (untuk navbar)
export const useCartCount = () => {
  const currentCartTotalUniqueItems = useAppSelector(
    (state) => state.cart.currentCartTotalUniqueItems
  );
  
  return currentCartTotalUniqueItems;
};
