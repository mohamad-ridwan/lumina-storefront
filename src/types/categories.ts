export interface Collections {
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
export interface ParentCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  collections: Collections[];
  parentCategory?: ParentCategory;
}

/**
 * Interface untuk struktur respons API lengkap saat mengambil kategori.
 * Ini mencakup status sukses, pesan, dan array kategori.
 */
export interface CategoryResponse {
  success: boolean;
  message: string;
  categories?: Category[]; // Array dari Category
  category?: Category;
}
