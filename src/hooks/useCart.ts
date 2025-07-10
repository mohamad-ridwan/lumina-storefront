"use client";

import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { addToCartAsync, getCartAsync, clearCartError, resetCart } from "@/store/cart/cartSlice";
import { useCallback } from "react";

// Typed hooks for Redux
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Hook untuk menggunakan cart state dan actions
export const useCart = () => {
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
