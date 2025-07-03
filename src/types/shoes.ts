/**
 * @fileoverview Type Definitions for Shoe Product Data
 * These interfaces define the structure for shoe product data,
 * including nested categories and variants, fetched from the API.
 */

/**
 * Interface untuk sub-kategori yang ada di dalam objek produk sepatu.
 * Ini lebih sederhana daripada SubCategory global karena hanya berisi ID dan nama/slug.
 */
export interface SubCategoryInProduct {
  _id: string;
  name: string;
  slug: string;
}

/**
 * Interface untuk kategori yang ada di dalam objek produk sepatu.
 * Ini mencakup kategori utama dan sub-kategori terkait.
 */
export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  subCategories: SubCategoryInProduct[];
}

/**
 * Interface untuk atribut varian produk (misalnya, Ukuran, Warna).
 */
export interface VariantAttribute {
  name: string;
  options: string[]; // Array dari string untuk opsi (misalnya, "30", "Hitam")
  _id: string;
}

/**
 * Interface untuk setiap varian spesifik dari produk.
 * `optionValues` adalah Record karena kunci (nama atribut) dan nilai (opsi) bersifat dinamis.
 */
export interface Variant {
  optionValues: Record<string, string>; // Contoh: { "Ukuran": "30", "Warna": "Hitam" }
  price: number;
  stock: number;
  sku: string;
  imageUrl: string;
  _id: string;
}

/**
 * Interface untuk objek produk sepatu tunggal.
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
 * Interface untuk struktur respons API lengkap saat mengambil daftar sepatu.
 */
export interface ShoesResponse {
  success: boolean;
  message: string;
  total: number;
  limit: number;
  shoes: Shoe[]; // Array dari objek Shoe
}
