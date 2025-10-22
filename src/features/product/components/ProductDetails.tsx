/**
 * @fileoverview Product Details Component
 * Detailed product information and purchase options
 */

import { useState } from 'react';
import { Product, Variant } from '@/shared/types/product';
import { formatPrice } from '@/shared/lib/formatPrice';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Minus, Plus, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/features/cart/hooks/useCart';

export interface ProductDetailsProps {
  product: Product;
  className?: string;
}

export const ProductDetails = ({ product, className }: ProductDetailsProps) => {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const { addToCart } = useCart();

  // Get current price and stock based on selected variant
  const currentPrice = selectedVariant?.price ?? product.price;
  const currentStock = selectedVariant?.stock ?? product.stock;
  const isOutOfStock = currentStock === 0;

  const handleVariantChange = (variantId: string) => {
    const variant = product.variants.find(v => v._id === variantId);
    setSelectedVariant(variant || null);
    // Reset quantity when variant changes
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    const maxQuantity = Math.min(currentStock, 99);
    const validQuantity = Math.max(1, Math.min(newQuantity, maxQuantity));
    setQuantity(validQuantity);
  };

  const handleAddToCart = async () => {
    if (isOutOfStock) return;

    setIsAddingToCart(true);
    try {
      await addToCart({
        shoeId: product._id,
        selectedVariantId: selectedVariant?._id || null,
        quantity,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Product Title and Brand */}
      <div className="space-y-2">
        {product.brand && (
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {product.brand}
          </p>
        )}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {product.name}
        </h1>
      </div>

      {/* Price and Stock */}
      <div className="space-y-2">
        <p className="text-3xl font-bold text-primary">
          {formatPrice(currentPrice)}
        </p>
        <div className="flex items-center gap-2">
          <Badge variant={isOutOfStock ? 'destructive' : 'secondary'}>
            {isOutOfStock ? 'Out of Stock' : `${currentStock} in stock`}
          </Badge>
          {product.newArrival && (
            <Badge variant="outline">New Arrival</Badge>
          )}
          {product.label && (
            <Badge variant="outline">{product.label}</Badge>
          )}
        </div>
      </div>

      {/* Variant Selection */}
      {product.variants.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Select Variant</h3>
          <Select
            value={selectedVariant?._id || ''}
            onValueChange={handleVariantChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a variant" />
            </SelectTrigger>
            <SelectContent>
              {product.variants.map((variant) => (
                <SelectItem key={variant._id} value={variant._id}>
                  <div className="flex items-center justify-between w-full">
                    <span>
                      {Object.entries(variant.optionValues).map(([key, value]) => 
                        `${key}: ${value}`
                      ).join(', ')}
                    </span>
                    <span className="ml-2 font-medium">
                      {formatPrice(variant.price)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Quantity Selection */}
      {!isOutOfStock && (
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Quantity</h3>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= currentStock || quantity >= 99}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAddingToCart}
          className="flex-1"
          size="lg"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {isAddingToCart ? 'Adding...' : 'Add to Cart'}
        </Button>
        
        <Button variant="outline" size="lg">
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      {/* Product Description */}
      {product.description && (
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Description</h3>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
      )}

      {/* Product Categories */}
      {product.category && product.category.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {product.category.map((cat) => (
              <Badge key={cat._id} variant="outline">
                {cat.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};