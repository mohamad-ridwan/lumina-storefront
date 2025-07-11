"use client";

import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { CartItem, GetCartResponse } from "@/types/cart";
import { updateCartQuantity } from "@/services/api/cart/updateCartQuantity";
import { removeFromCart } from "@/services/api/cart/removeFromCart";
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
} from "@/store/selectors";
import { useRouter } from "next/navigation";

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
  updateCartItems: (
    updatedItems: CartItem[],
    cartTotalPrice: number,
    totalItems: number
  ) => void;
}

// Original useCart hook implementation (preserving existing logic)
export function useCart(
  initialCartItems: CartItem[],
  userId: string,
  onCartUpdate?: (
    updatedItems: CartItem[],
    newTotal: number,
    totalItems: number
  ) => void
): UseCartReturn {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateCartItems = useCallback(
    (updatedItems: CartItem[], cartTotalPrice: number, totalItems: number) => {
      onCartUpdate?.(updatedItems, cartTotalPrice, totalItems);
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
        // const resultUpdate: GetCartResponse = await updateCartQuantity({
        //   userId,
        //   shoeId,
        //   selectedVariantId,
        //   quantity: newQuantity,
        // });

        const resultUpdate: GetCartResponse = await updateCartQuantity({
          userId,
          shoeId,
          selectedVariantId,
          quantity: newQuantity,
        });

        updateCartItems(
          resultUpdate.cartItems,
          resultUpdate.cartTotalPrice,
          resultUpdate.totalProduct
        );
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

        updateCartItems(
          result.cartItems,
          result.cartTotalPrice,
          result.totalProduct
        );
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
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// New Redux-based cart hook for global state management
export const useReduxCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotalPrice = useSelector(selectCartTotalPrice);
  const currentCartTotalUniqueItems = useSelector(selectCartTotalUniqueItems);
  const totalProduct = useSelector(selectCartTotalProducts);
  const isLoading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);
  const user = useSelector(selectUser);

  const router = useRouter();

  // Function untuk menambahkan item ke cart
  const addToCart = useCallback(
    async (params: {
      shoeId: string;
      selectedVariantId: string | null;
      quantity: number;
    }) => {
      if (!user?._id) {
        toast.error("Silakan login terlebih dahulu");
        router.push("/auth/login");
        return;
      }

      try {
        await dispatch(
          addToCartAsync({
            userId: user._id,
            ...params,
          })
        ).unwrap();
        toast.success("Produk berhasil ditambahkan ke keranjang");
      } catch (error: unknown) {
        toast.error(
          (error as Error)?.message || "Gagal menambahkan ke keranjang"
        );
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
    }) => {
      if (!user?._id) {
        toast.error("Silakan login terlebih dahulu");
        return;
      }

      try {
        await dispatch(
          updateCartQuantityAsync({
            userId: user._id,
            ...params,
          })
        ).unwrap();
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
        await dispatch(
          removeFromCartAsync({
            userId: user._id,
            cartId,
          })
        ).unwrap();
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
