import { GetCartResponse } from "@/types/cart"; // Sesuaikan path ini jika perlu
import fetchData from "../fetchData"; // Sesuaikan path ini jika perlu
import { clientAPI } from "../clientAPI"; // Sesuaikan path ini jika perlu

// Interface untuk query parameter fungsi fetchCart
interface CartQuery {
  userId: string; // userId wajib ada untuk mengambil data keranjang
}

/**
 * Mengambil item keranjang belanja untuk pengguna tertentu.
 * @param {CartQuery} params - Objek yang berisi userId pengguna.
 * @returns {Promise<CartItem[]>} - Mengembalikan array dari CartItem.
 * @throws {Error} - Melempar error jika pengambilan data gagal atau userId tidak valid.
 */
export async function fetchCart({
  userId,
}: CartQuery): Promise<GetCartResponse> {
  try {
    // Validasi userId sebelum melakukan request
    if (!userId) {
      throw new Error("User ID is required to fetch cart.");
    }
    const url = `${clientAPI}/cart?userId=${userId}`;

    // Menggunakan fetchData dengan tipe respons GetCartResponse
    const responseData = await fetchData<GetCartResponse>(url, "GET");

    // Memastikan respons sukses dan mengembalikan array cartItems
    if (responseData.success && responseData.cartItems) {
      return responseData;
    } else {
      // Jika 'success' adalah false atau data tidak sesuai, lempar error
      // Pesan dari API akan digunakan jika tersedia
      throw new Error(
        responseData.message || "Gagal mengambil data keranjang."
      );
    }
  } catch (error) {
    // Re-throw error yang sudah ditangani oleh fetchData atau error lainnya
    console.error("Error saat mengambil data keranjang:", error);
    throw error; // Biarkan error ditangani lebih lanjut oleh pemanggil fungsi ini
  }
}
