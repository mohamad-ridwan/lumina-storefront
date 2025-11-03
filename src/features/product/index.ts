/**
 * @fileoverview Product Feature Exports
 * Central export point for product feature components and hooks
 */

// Components
export { ProductCard } from "./components/ProductCard";
export { ProductGallery } from "./components/ProductGallery";
export { ProductDetails } from "./components/ProductDetails_older";

// Hooks
export { useProduct, useProductSearch } from "./hooks/useProduct";

// Types
export type { ProductCardProps } from "./components/ProductCard";
export type { ProductGalleryProps } from "./components/ProductGallery";
export type { ProductDetailsProps } from "./components/ProductDetails_older";
export type {
  UseProductReturn,
  UseProductSearchReturn,
} from "./hooks/useProduct";
