/**
 * @fileoverview Product Domain Entities
 * Core domain models for products, categories, and variants
 */

/**
 * Value object for sub-category within a product
 */
export interface SubCategoryInProduct {
  _id: string;
  name: string;
  slug: string;
  level: number;
}

/**
 * Value object for product category
 */
export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  level: number;
  subCategories: SubCategoryInProduct[];
}

/**
 * Value object for variant attribute (e.g., Size, Color)
 */
export interface VariantAttribute {
  name: string;
  options: string[];
  _id: string;
}

/**
 * Value object for product variant
 */
export interface Variant {
  readonly optionValues: Readonly<Record<string, string>>;
  readonly price: number;
  readonly stock: number;
  readonly sku: string;
  readonly imageUrl: string;
  readonly _id: string;
}

/**
 * Product aggregate root
 */
export interface Shoe {
  _id: string;
  name: string;
  brand: string;
  label: string;
  newArrival: boolean;
  description: string;
  category: ProductCategory[]; // Array dari ProductCategory
  slug: string;
  image: string; // URL gambar utama produk
  price: number;
  stock: number;
  variantAttributes: VariantAttribute[];
  variants: Variant[];
  createdAt: string; // Tanggal dalam format ISO string
  updatedAt: string; // Tanggal dalam format ISO string
}

/**
 * Product search criteria value object
 */
export interface ProductSearchCriteria {
  readonly keywords?: string;
  readonly category?: string;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly brand?: string;
  readonly sort?: "termurah" | "termahal" | "terbaru";
  readonly page?: number;
  readonly limit?: number;
}

/**
 * Product collection with pagination
 */
export interface ProductCollection {
  readonly products: readonly Shoe[];
  readonly total: number;
  readonly limit: number;
  readonly currentPage: number;
  readonly totalPages: number;
  readonly sort?: "termurah" | "termahal" | "terbaru";
}
