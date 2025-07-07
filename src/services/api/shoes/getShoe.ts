import { Shoe, ShoesResponse } from "@/types/shoes";
import fetchData from "../fetchData";
import { clientAPI } from "../clientAPI";

interface ShoeQuery {
  newArrival?: boolean;
  limit?: number;
  id?: number;
  slug?: string;
  offerId?: string;
}

export async function getShoe({
  newArrival,
  limit = 0,
  id,
  slug,
  offerId,
}: ShoeQuery): Promise<Shoe[]> {
  try {
    // Menggunakan fetchData dengan tipe respons CategoryResponse
    let query: string = "";
    if (newArrival) {
      query = "newArrival=true";
    }
    if (id) {
      query = `id=${id}`;
    }
    if (slug) {
      query = `slug/${slug}`;
    }
    if (offerId) {
      query = `offerId=${offerId}`;
    }
    const responseData = await fetchData<ShoesResponse>(
      `${clientAPI}/shoes?limit=${limit}&${query}`,
      "GET"
    );

    // Memastikan respons sukses dan mengembalikan array kategori
    if (responseData.success) {
      return responseData.shoes;
    } else {
      // Jika 'success' adalah false, lempar error dengan pesan dari API
      throw new Error(responseData.message || "Gagal mengambil sepatu.");
    }
  } catch (error) {
    // Re-throw error yang sudah ditangani oleh fetchData atau error lainnya
    console.error("Error saat mengambil sepatu:", error);
    throw error; // Biarkan error ditangani lebih lanjut oleh pemanggil
  }
}
