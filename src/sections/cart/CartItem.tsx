"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { CartItem as CartItemType } from "@/types/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (
    cartItemId: string,
    newQuantity: number,
    availableStock: number
  ) => Promise<void>;
  onRemoveItem: (cartItemId: string) => Promise<void>;
  isUpdating: boolean;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemoveItem,
  isUpdating,
}: CartItemProps) {
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuantityChange = async (newQuantity: number) => {
    setError(null);
    setIsLoading(true);

    try {
      await onUpdateQuantity(item._id, newQuantity, item.availableStock);
      setLocalQuantity(newQuantity);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal mengupdate quantity"
      );
      setLocalQuantity(item.quantity); // Revert to original quantity
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setLocalQuantity(value);
  };

  const handleInputBlur = () => {
    if (localQuantity !== item.quantity && localQuantity > 0) {
      handleQuantityChange(localQuantity);
    } else {
      setLocalQuantity(item.quantity);
    }
  };

  const handleRemove = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await onRemoveItem(item._id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus item");
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const getVariantInfo = () => {
    if (!item.variantOptionValues) return null;

    return Object.values(item.variantOptionValues).join(" / ");
  };

  const variantInfo = getVariantInfo();

  const directProductSlug = useMemo(() => {
    if (item.selectedVariantId) {
      return `/product/${item.slug}?variant=${item.selectedVariantId}&quantity=${item.quantity}`;
    } else {
      return `/product/${item.slug}&quantity=${item.quantity}`;
    }
  }, [item]);

  return (
    <div className="flex gap-4 p-4 border rounded-lg bg-white">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-md">
          {item.image ? (
            <Link href={directProductSlug}>
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </Link>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-xs">No Image</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link href={directProductSlug}>
          <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
        </Link>

        {variantInfo && (
          <p className="text-sm text-gray-600 mt-1">{variantInfo}</p>
        )}

        <p className="text-sm text-gray-500 mt-1">
          Stock tersedia: {item.availableStock}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            {/* Decrease Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleQuantityChange(Math.max(1, localQuantity - 1))
              }
              disabled={isLoading || isUpdating || localQuantity <= 1}
              className="w-8 h-8 p-0"
            >
              <Minus className="w-3 h-3" />
            </Button>

            {/* Quantity Input */}
            <Input
              type="number"
              value={localQuantity}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              disabled={isLoading || isUpdating}
              className="w-16 h-8 text-center text-sm"
              min="1"
              max={item.availableStock}
            />

            {/* Increase Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleQuantityChange(
                  Math.min(item.availableStock, localQuantity + 1)
                )
              }
              disabled={
                isLoading || isUpdating || localQuantity >= item.availableStock
              }
              className="w-8 h-8 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          {/* Remove Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRemove}
            disabled={isLoading || isUpdating}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>

      {/* Price */}
      <div className="flex-shrink-0 text-right">
        {/* <p className="font-medium text-gray-900">
          {formatPrice(item.subtotal)}
        </p> */}
        <p className="font-medium text-gray-900">{formatPrice(item.price)}</p>
      </div>
    </div>
  );
}
