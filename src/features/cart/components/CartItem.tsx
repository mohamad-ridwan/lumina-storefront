/**
 * @fileoverview Cart Item Component
 * Individual cart item with quantity controls and remove functionality
 */

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/shared/types/cart';
import { formatPrice } from '@/shared/lib/formatPrice';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/features/cart/hooks/useCart';

export interface CartItemProps {
  item: CartItemType;
  className?: string;
  showRemoveButton?: boolean;
}

export const CartItem = ({ 
  item, 
  className,
  showRemoveButton = true 
}: CartItemProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > item.availableStock) return;
    
    setIsUpdating(true);
    try {
      await updateQuantity({
        shoeId: item.shoeId!,
        selectedVariantId: item.selectedVariantId,
        quantity: newQuantity,
        availableStock: item.availableStock,
      });
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    try {
      await removeItem(item._id);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  return (
    <div className={cn('flex gap-4 p-4 border border-border rounded-lg', className)}>
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Link href={`/product/${item.slug}`}>
          <div className="relative w-20 h-20 bg-muted rounded-md overflow-hidden">
            <Image
              src={item.image || '/no-image.jpg'}
              alt={item.name}
              fill
              className="object-cover hover:scale-105 transition-transform"
              sizes="80px"
            />
          </div>
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0 space-y-2">
        <div>
          <Link 
            href={`/product/${item.slug}`}
            className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
          >
            {item.name}
          </Link>
          
          {/* Variant Information */}
          {item.variantOptionValues && (
            <p className="text-sm text-muted-foreground">
              {Object.entries(item.variantOptionValues).map(([key, value]) => 
                `${key}: ${value}`
              ).join(', ')}
            </p>
          )}
          
          {/* SKU */}
          {item.variantSku && (
            <p className="text-xs text-muted-foreground">
              SKU: {item.variantSku}
            </p>
          )}
        </div>

        {/* Price and Controls */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-semibold text-primary">
              {formatPrice(item.price)}
            </p>
            <p className="text-sm text-muted-foreground">
              Subtotal: {formatPrice(item.subtotal)}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1 || isUpdating}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= item.availableStock || isUpdating}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Stock Information */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {item.availableStock > 0 
              ? `${item.availableStock} available` 
              : 'Out of stock'
            }
          </span>
          
          {showRemoveButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-auto p-1"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};