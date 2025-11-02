/**
 * @fileoverview Product Domain Entities
 * Core domain models for products, categories, and variants
 */

/**
 * Value object for sub-category within a product
 */
export interface SubCategory {
  readonly _id: string;
  readonly name: string;
  readonly slug: string;
  readonly level: number;
}

/**
 * Value object for product category
 */
export interface Category {
  readonly _id: string;
  readonly name: string;
  readonly slug: string;
  readonly level: number;
  readonly subCategories: SubCategory[];
}

/**
 * Value object for variant attribute (e.g., Size, Color)
 */
export interface VariantAttribute {
  readonly name: string;
  readonly options: readonly string[];
  readonly _id: string;
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
export interface Product {
  readonly _id: string;
  readonly name: string;
  readonly brand: string;
  readonly label: string;
  readonly newArrival: boolean;
  readonly description: string;
  readonly category: readonly Category[];
  readonly slug: string;
  readonly image: string;
  readonly price: number;
  readonly stock: number;
  readonly variantAttributes: readonly VariantAttribute[];
  readonly variants: readonly Variant[];
  readonly createdAt: string;
  readonly updatedAt: string;
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
  readonly sort?: 'termurah' | 'termahal' | 'terbaru';
  readonly page?: number;
  readonly limit?: number;
}

/**
 * Product collection with pagination
 */
export interface ProductCollection {
  readonly products: readonly Product[];
  readonly total: number;
  readonly limit: number;
  readonly currentPage: number;
  readonly totalPages: number;
  readonly sort?: 'termurah' | 'termahal' | 'terbaru';
}