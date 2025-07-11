"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useReduxCart } from "@/hooks/useCart";
import { selectUserAuthStatus } from "@/store/selectors";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import MobileOrderSummary from "./MobileOrderSummary";

export default function CartContent() {
  const router = useRouter();
  const { user, isAuthenticated, hasValidSession } = useSelector(selectUserAuthStatus);
  const { 
    cartItems, 
    cartTotalPrice, 
    currentCartTotalUniqueItems, 
    totalProduct,
    isLoading, 
    isUpdatingQuantity,
    isRemovingItem,
    updateQuantity, 
    removeItem,
    getCart
  } = useReduxCart();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated || !hasValidSession || !user?._id) {
      router.push('/auth/login?redirect=/cart');
    }
  }, [isAuthenticated, hasValidSession, user?._id, router]);

  // Fetch cart data when component mounts or user changes
  useEffect(() => {
    if (isAuthenticated && hasValidSession && user?._id) {
      getCart(user._id);
    }
  }, [isAuthenticated, hasValidSession, user?._id, getCart]);

  // Show loading state only when initially loading cart (no items yet)
  if (isLoading && cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Memuat Keranjang...
          </h3>
          <p className="text-gray-500">
            Sedang mengambil data keranjang belanja Anda
          </p>
        </div>
      </div>
    );
  }

  // Show empty cart state
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
          <h1 className="text-xl font-bold text-gray-900">
            Keranjang Belanja ({currentCartTotalUniqueItems} item, {totalProduct} produk)
          </h1>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onUpdateQuantity={(shoeId, selectedVariantId, newQuantity, availableStock) => 
                  updateQuantity({ 
                    shoeId, 
                    selectedVariantId, 
                    quantity: newQuantity, 
                    availableStock 
                  })
                }
                onRemoveItem={removeItem}
                isUpdatingQuantity={isUpdatingQuantity}
                isRemovingItem={isRemovingItem}
              />
            ))}
          </div>
        </div>

        {/* Order Summary - Right Side (1/3 width) */}
        <div className="md:col-span-1">
          <OrderSummary
            totalItems={totalProduct}
            totalPrice={cartTotalPrice}
            isUpdating={isUpdatingQuantity || isRemovingItem}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4">
        <h1 className="text-xl font-bold text-gray-900">
          Keranjang Belanja ({totalProduct} produk)
        </h1>

        {/* Cart Items - Mobile (single column) */}
        <div className="space-y-4 pb-24">
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onUpdateQuantity={(shoeId, selectedVariantId, newQuantity, availableStock) => 
                updateQuantity({ 
                  shoeId, 
                  selectedVariantId, 
                  quantity: newQuantity, 
                  availableStock 
                })
              }
              onRemoveItem={removeItem}
              isUpdatingQuantity={isUpdatingQuantity}
              isRemovingItem={isRemovingItem}
            />
          ))}
        </div>

        {/* Mobile Order Summary (Fixed bottom) */}
        <MobileOrderSummary
          totalItems={totalProduct}
          totalPrice={cartTotalPrice}
          isUpdating={isUpdatingQuantity || isRemovingItem}
        />
      </div>
    </div>
  );
}
