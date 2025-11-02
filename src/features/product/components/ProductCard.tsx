/**
 * @fileoverview Product Card Component
 * Reusable product card for displaying product information
 */

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/shared/types/product";
import { formatPrice } from "@/shared/lib/formatPrice";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/components/ui/badge";

export interface ProductCardProps {
  product: Product;
  className?: string;
  showBadges?: boolean;
  imageSize?: "sm" | "md" | "lg";
}

const imageSizes = {
  sm: "h-48",
  md: "h-64",
  lg: "h-80",
};

export const ProductCard = ({
  product,
  className,
  showBadges = true,
  imageSize = "md",
}: ProductCardProps) => {
  return (
    <Link href={`/products/${product.slug}`}>
      <div
        className={cn(
          "group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer",
          className
        )}
      >
        {/* Product Image */}
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            imageSizes[imageSize]
          )}
        >
          <Image
            src={product.image || "/no-image.jpg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges */}
          {showBadges && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.newArrival && (
                <Badge variant="secondary" className="text-xs">
                  New
                </Badge>
              )}
              {product.label && (
                <Badge variant="outline" className="text-xs">
                  {product.label}
                </Badge>
              )}
            </div>
          )}

          {/* Stock indicator */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Brand */}
          {product.brand && (
            <p className="text-sm text-muted-foreground font-medium">
              {product.brand}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </p>

            {/* Stock count */}
            <p className="text-xs text-muted-foreground">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>

          {/* Categories */}
          {product.category && product.category.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.category.slice(0, 2).map((cat) => (
                <Badge key={cat._id} variant="outline" className="text-xs">
                  {cat.name}
                </Badge>
              ))}
              {product.category.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{product.category.length - 2} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
