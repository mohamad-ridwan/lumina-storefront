/**
 * @fileoverview Type Definitions for Category Data
 * These interfaces define the structure for category and sub-category data
 * fetched from the API.
 */

/**
 * Interface untuk Sub-Kategori.
 * Sub-kategori memiliki struktur yang mirip dengan kategori utama tetapi tidak memiliki sub-kategori lagi.
 */
export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

/**
 * Interface untuk Kategori Utama.
 * Kategori utama dapat memiliki array sub-kategori.
 */
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  subCategories: SubCategory[]; // Array dari SubCategory
}

/**
 * Interface untuk struktur respons API lengkap saat mengambil kategori.
 * Ini mencakup status sukses, pesan, dan array kategori.
 */
export interface CategoryResponse {
  success: boolean;
  message: string;
  categories: Category[]; // Array dari Category
}
