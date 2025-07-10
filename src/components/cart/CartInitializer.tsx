"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useReduxCart } from "@/hooks/useCart";

const CartInitializer = () => {
  const { getCart } = useReduxCart();
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  useEffect(() => {
    // Initialize cart data when user is authenticated
    const initializeCart = async () => {
      if (isAuthenticated && user?._id) {
        try {
          await getCart(user._id);
        } catch (error) {
          console.error("Error initializing cart:", error);
          // Error is expected if user has no cart yet, so we can ignore it
        }
      }
    };

    initializeCart();
  }, [getCart, user?._id, isAuthenticated]);

  // This component doesn't render anything
  return null;
};

export default CartInitializer;
