import { Category, CategoryResponse } from "@/types/categories";
import fetchData from "../fetchData";
import { clientAPI } from "../clientAPI";

interface CategoryQuery {
  limit?: number;
  slug?: string;
  level?: "0" | "1";
}

export async function fetchCategories({
  limit = 0,
  slug,
  level,
}: CategoryQuery): Promise<Category[] | Category> {
  try {
    // Menggunakan fetchData dengan tipe respons CategoryResponse
    let query: string = "";
    if (slug) {
      query += `&slug=${slug}`;
    }
    if (level) {
      query += `&level=${level}`;
    }
    const responseData = await fetchData<CategoryResponse>(
      `${clientAPI}/categories?limit=${limit}${query}`,
      "GET"
    );

    // Memastikan respons sukses dan mengembalikan array kategori
    if (responseData.success && responseData?.categories) {
      return responseData.categories;
    } else if (responseData.success && responseData?.category) {
      return responseData.category;
    } else {
      // Jika 'success' adalah false, lempar error dengan pesan dari API
      throw new Error(responseData.message || "Gagal mengambil kategori.");
    }
  } catch (error) {
    // Re-throw error yang sudah ditangani oleh fetchData atau error lainnya
    console.error("Error saat mengambil kategori:", error);
    throw error; // Biarkan error ditangani lebih lanjut oleh pemanggil
  }
}
