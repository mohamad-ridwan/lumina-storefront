"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CartItem as CartItemType, GetCartResponse } from "@/types/cart";
import { useCart } from "@/hooks/useCart";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import MobileOrderSummary from "./MobileOrderSummary";

interface CartContentProps {
  initialCartData: GetCartResponse;
}

export default function CartContent({ initialCartData }: CartContentProps) {
  const [cartItems, setCartItems] = useState<CartItemType[]>(
    initialCartData.cartItems
  );
  const [totalPrice, setTotalPrice] = useState(initialCartData.cartTotalPrice);
  const [totalItems, setTotalItems] = useState(
    initialCartData.currentCartTotalUniqueItems
  );
  const [userId, setUserId] = useState<string>("");

  // Get userId from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userSession = localStorage.getItem(
        "user-session-lumina-storefront"
      );
      if (userSession) {
        try {
          const sessionData = JSON.parse(userSession);
          setUserId(sessionData.userId || sessionData.id || "");
        } catch (error) {
          console.error("Error parsing user session:", error);
          // Fallback to static userId for now
          setUserId("67e65beb165cb6e6184d63c0");
        }
      } else {
        // Fallback to static userId for now
        setUserId("67e65beb165cb6e6184d63c0");
      }
    }
  }, []);

  const handleCartUpdate = (updatedItems: CartItemType[], newTotal: number) => {
    setCartItems(updatedItems);
    setTotalPrice(newTotal);
    setTotalItems(updatedItems.length);
  };

  const { isUpdating, updateQuantity, removeItem } = useCart(
    cartItems,
    userId,
    handleCartUpdate
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 8M7 13l-1.5-8M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Keranjang Belanja Kosong
          </h3>
          <p className="text-gray-500 mb-6">
            Belum ada produk di keranjang belanja Anda
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            Mulai Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {/* Cart Items - Left Side (2/3 width) */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Keranjang Belanja ({totalItems} produk)
          </h1>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                isUpdating={isUpdating}
              />
            ))}
          </div>
        </div>

        {/* Order Summary - Right Side (1/3 width) */}
        <div className="md:col-span-1">
          <OrderSummary
            totalItems={totalItems}
            totalPrice={totalPrice}
            isUpdating={isUpdating}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4">
        <h1 className="text-xl font-bold text-gray-900">Keranjang Belanja</h1>

        {/* Cart Items - Mobile (single column) */}
        <div className="space-y-4 pb-24">
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              isUpdating={isUpdating}
            />
          ))}
        </div>

        {/* Mobile Order Summary (Fixed bottom) */}
        <MobileOrderSummary
          totalItems={totalItems}
          totalPrice={totalPrice}
          isUpdating={isUpdating}
        />
      </div>
    </div>
  );
}
