"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { AppDispatch } from "@/store";
import { 
  addToCartAsync, 
  getCartAsync, 
  updateCartQuantityAsync,
  removeFromCartAsync,
  clearCartError, 
  resetCart 
} from "@/store/cart/cartSlice";
import { 
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalUniqueItems,
  selectCartTotalProducts,
  selectCartLoading,
  selectCartError,
  selectUser,
  selectCartCount
} from "@/store/selectors";

// Redux-based cart hook for global state management
export const useReduxCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const cartTotalPrice = useSelector(selectCartTotalPrice);
  const currentCartTotalUniqueItems = useSelector(selectCartTotalUniqueItems);
  const totalProduct = useSelector(selectCartTotalProducts);
  const isLoading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);
  const user = useSelector(selectUser);

  // Function untuk menambahkan item ke cart
  const addToCart = useCallback(
    async (params: {
      shoeId: string;
      selectedVariantId: string | null;
      quantity: number;
    }) => {
      if (!user?._id) {
        toast.error("Silakan login terlebih dahulu");
        return;
      }

      try {
        await dispatch(addToCartAsync({
          userId: user._id,
          ...params
        })).unwrap();
        toast.success("Produk berhasil ditambahkan ke keranjang");
      } catch (error: unknown) {
        toast.error((error as Error)?.message || "Gagal menambahkan ke keranjang");
        throw error;
      }
    },
    [dispatch, user?._id]
  );

  // Function untuk mengambil data cart
  const getCart = useCallback(
    async (userId?: string) => {
      const userIdToUse = userId || user?._id;
      if (!userIdToUse) {
        return;
      }

      try {
        await dispatch(getCartAsync(userIdToUse)).unwrap();
      } catch (error: unknown) {
        // Don't show error toast for getting cart, as it might not exist yet
        console.error("Error getting cart:", error);
        throw error;
      }
    },
    [dispatch, user?._id]
  );

  // Function untuk update quantity
  const updateQuantity = useCallback(
    async (params: {
      shoeId: string;
      selectedVariantId: string | null;
      quantity: number;
      availableStock?: number;
    }) => {
      if (!user?._id) {
        toast.error("Silakan login terlebih dahulu");
        return;
      }

      // Validate quantity constraints
      if (params.availableStock && params.quantity > params.availableStock) {
        toast.error(`Quantity tidak boleh melebihi stock yang tersedia (${params.availableStock})`);
        return;
      }

      if (params.quantity < 1) {
        toast.error("Quantity minimal adalah 1");
        return;
      }

      try {
        await dispatch(updateCartQuantityAsync({
          userId: user._id,
          shoeId: params.shoeId,
          selectedVariantId: params.selectedVariantId,
          quantity: params.quantity
        })).unwrap();
        toast.success("Quantity berhasil diupdate");
      } catch (error: unknown) {
        toast.error((error as Error)?.message || "Gagal mengupdate quantity");
        throw error;
      }
    },
    [dispatch, user?._id]
  );

  // Function untuk remove item dari cart
  const removeItem = useCallback(
    async (cartId: string) => {
      if (!user?._id) {
        toast.error("Silakan login terlebih dahulu");
        return;
      }

      try {
        await dispatch(removeFromCartAsync({
          userId: user._id,
          cartId
        })).unwrap();
        toast.success("Item berhasil dihapus dari keranjang");
      } catch (error: unknown) {
        toast.error((error as Error)?.message || "Gagal menghapus item");
        throw error;
      }
    },
    [dispatch, user?._id]
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
    cartItems,
    currentCartTotalUniqueItems,
    cartTotalPrice,
    totalProduct,
    isLoading,
    error,
    user,
    
    // Actions
    addToCart,
    getCart,
    updateQuantity,
    removeItem,
    clearError,
    resetCartState,
  };
};

// Hook untuk hanya menggunakan cart count (untuk navbar)
export const useCartCount = () => {
  const cartCount = useSelector(selectCartCount);
  
  return cartCount;
};

// Legacy export for backwards compatibility (will be deprecated)
export const useCart = useReduxCart;
