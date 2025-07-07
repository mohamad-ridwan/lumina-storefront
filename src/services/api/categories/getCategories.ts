import { Category, CategoryResponse } from "@/types/categories";
import fetchData from "../fetchData";
import { clientAPI } from "../clientAPI";

interface CategoryQuery {
  limit?: number;
}

export async function fetchCategories({
  limit,
}: CategoryQuery): Promise<Category[]> {
  try {
    // Menggunakan fetchData dengan tipe respons CategoryResponse
    const query: string = "" as const;
    const responseData = await fetchData<CategoryResponse>(
      `${clientAPI}/categories?limit=${limit}&${query}`,
      "GET"
    );

    // Memastikan respons sukses dan mengembalikan array kategori
    if (responseData.success) {
      return responseData.categories;
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
