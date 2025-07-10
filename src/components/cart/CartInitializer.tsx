"use client";

import { useEffect } from "react";
import { useReduxCart } from "@/hooks/useCart";

const CartInitializer = () => {
  const { getCart } = useReduxCart();

  useEffect(() => {
    // Initialize cart data on app startup
    const initializeCart = async () => {
      try {
        // TODO: Replace with actual user ID from authentication
        // For now using demo user ID
        const userId = "67e65beb165cb6e6184d63c0";

        if (userId) {
          await getCart(userId);
        }
      } catch (error) {
        console.error("Error initializing cart:", error);
        // Error is expected if user has no cart yet, so we can ignore it
      }
    };

    initializeCart();
  }, [getCart]);

  // This component doesn't render anything
  return null;
};

export default CartInitializer;
