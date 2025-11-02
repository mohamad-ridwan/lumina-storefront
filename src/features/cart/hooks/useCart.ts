/**
 * @fileoverview Cart Feature Hook
 * Hook for cart-related operations using clean architecture use cases
 */

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store";
import {
  addToCartAsync,
  getCartAsync,
  updateCartQuantityAsync,
  removeFromCartAsync,
  clearCartError,
  resetCart,
} from "@/store/cart/cartSlice";
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalUniqueItems,
  selectCartTotalProducts,
  selectCartLoading,
  selectCartError,
  selectUser,
  selectCartCount,
  selectCartUpdatingQuantity,
  selectCartRemovingItem,
  selectCartAddingItem,
} from "@/store/selectors";
import { authValidationClient } from "@/shared/lib/auth-validation-client";
import {
  AddToCartCommand,
  UpdateCartQuantityCommand,
  RemoveFromCartCommand,
} from "@/shared/types/cart";

export interface UseCartReturn {
  // State
  cartItems: any[];
  currentCartTotalUniqueItems: number;
  cartTotalPrice: number;
  totalProduct: number;
  isLoading: boolean;
  isUpdatingQuantity: boolean;
  isRemovingItem: boolean;
  isAddingItem: boolean;
  error: string | null;
  user: any;

  // Actions
  addToCart: (params: Omit<AddToCartCommand, "userId">) => Promise<void>;
  getCart: (userId?: string) => Promise<void>;
  updateQuantity: (
    params: Omit<UpdateCartQuantityCommand, "userId"> & {
      availableStock?: number;
    }
  ) => Promise<void>;
  removeItem: (cartId: string) => Promise<void>;
  clearError: () => void;
  resetCartState: () => void;
}

export const useCart = (): UseCartReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const cartTotalPrice = useSelector(selectCartTotalPrice);
  const currentCartTotalUniqueItems = useSelector(selectCartTotalUniqueItems);
  const totalProduct = useSelector(selectCartTotalProducts);
  const isLoading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);
  const user = useSelector(selectUser);
  const isUpdatingQuantity = useSelector(selectCartUpdatingQuantity);
  const isRemovingItem = useSelector(selectCartRemovingItem);
  const isAddingItem = useSelector(selectCartAddingItem);

  const router = useRouter();

  const addToCart = useCallback(
    async (params: Omit<AddToCartCommand, "userId">) => {
      if (!user?._id) {
        toast.error("Silakan login terlebih dahulu");
        router.push("/auth/login");
        return;
      }

      try {
        await authValidationClient(router, dispatch);
        await dispatch(
          addToCartAsync({
            userId: user._id,
            ...params,
          })
        ).unwrap();
        toast.success("Produk berhasil ditambahkan ke keranjang");
      } catch (error: unknown) {
        toast.error(
          (error as Error)?.message ||
            "Gagal menambahkan ke keranjang. Mohon coba lagi"
        );
        throw error;
      }
    },
    [dispatch, user?._id, router]
  );

  const getCart = useCallback(
    async (userId?: string) => {
      const userIdToUse = userId || user?._id;
      if (!userIdToUse) {
        return;
      }

      try {
        await dispatch(getCartAsync(userIdToUse)).unwrap();
      } catch (error: unknown) {
        console.error("Error getting cart:", error);
        throw error;
      }
    },
    [dispatch, user?._id]
  );

  const updateQuantity = useCallback(
    async (
      params: Omit<UpdateCartQuantityCommand, "userId"> & {
        availableStock?: number;
      }
    ) => {
      if (!user?._id) {
        toast.error("Silakan login terlebih dahulu");
        return;
      }

      // Validate quantity constraints
      if (params.availableStock && params.quantity > params.availableStock) {
        toast.error(
          `Quantity tidak boleh melebihi stock yang tersedia (${params.availableStock})`
        );
        return;
      }

      if (params.quantity < 1) {
        toast.error("Quantity minimal adalah 1");
        return;
      }

      try {
        await authValidationClient(router, dispatch);
        await dispatch(
          updateCartQuantityAsync({
            userId: user._id,
            shoeId: params.shoeId,
            selectedVariantId: params.selectedVariantId,
            quantity: params.quantity,
          })
        ).unwrap();
        toast.success("Quantity berhasil diupdate");
      } catch (error: unknown) {
        toast.error(
          (error as Error)?.message ||
            "Gagal mengupdate quantity. Mohon coba lagi"
        );
        throw error;
      }
    },
    [dispatch, user?._id, router]
  );

  const removeItem = useCallback(
    async (cartId: string) => {
      if (!user?._id) {
        toast.error("Silakan login terlebih dahulu");
        return;
      }

      try {
        await authValidationClient(router, dispatch);
        await dispatch(
          removeFromCartAsync({
            userId: user._id,
            cartId,
          })
        ).unwrap();
        toast.success("Item berhasil dihapus dari keranjang");
      } catch (error: unknown) {
        toast.error(
          (error as Error)?.message || "Gagal menghapus item. Mohon coba lagi"
        );
        throw error;
      }
    },
    [dispatch, user?._id, router]
  );

  const clearError = useCallback(() => {
    dispatch(clearCartError());
  }, [dispatch]);

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
    isUpdatingQuantity,
    isRemovingItem,
    isAddingItem,
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
