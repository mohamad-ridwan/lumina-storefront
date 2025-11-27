import { CustomBreadcrumbItem } from "@/shared/components/breadcrumbs/CustomBreadcrumb";
import { Shoe } from "./product";
import { Pagination } from "@/shared/types/pagination";

export interface AppCategoryProps {
  breadcrumbItems: CustomBreadcrumbItem[];
  shoes: Shoe[];
  label: string;
  sortParams?: string | undefined;
  pagination: Pagination;
  theme?: string;
}

export interface Collections {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export interface CategoryQuery {
  limit?: number;
  slug?: string;
  level?: "0" | "1";
  isPopular?: boolean;
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
  level: 0 | 1;
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
