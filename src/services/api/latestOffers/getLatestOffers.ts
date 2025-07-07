import { LatestOffer, LatestOffersResponse } from "@/types/latestOffers";
import fetchData from "../fetchData";
import { clientAPI } from "../clientAPI";

interface ReqLatestOffers {
  limit?: number;
}

export async function getLatestOffers({
  limit = 2,
}: ReqLatestOffers): Promise<LatestOffer[]> {
  try {
    // Menggunakan fetchData dengan tipe respons LatestOffersResponse
    const responseData = await fetchData<LatestOffersResponse>(
      `${clientAPI}/latest-offers?limit=${limit}`,
      "GET"
    );

    // Memastikan respons sukses dan mengembalikan array data penawaran
    if (responseData.success) {
      return responseData.data;
    } else {
      // Jika 'success' adalah false, lempar error dengan pesan dari API
      throw new Error(responseData.message || "Failed to fetch latest offers.");
    }
  } catch (error) {
    // Re-throw error yang sudah ditangani oleh fetchData atau error lainnya
    console.error("Error fetching latest offers:", error);
    throw error; // Biarkan error ditangani lebih lanjut oleh pemanggil
  }
}
