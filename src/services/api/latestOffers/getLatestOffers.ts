import { LatestOffer, LatestOffersResponse } from "@/types/latestOffers";
import fetchData from "../fetchData";
import { clientAPI } from "../clientAPI";

interface ReqLatestOffers {
  limit?: number;
  slug?: string;
}

export async function getLatestOffers({
  limit = 2,
  slug,
}: ReqLatestOffers): Promise<LatestOffer[]> {
  try {
    // Menggunakan fetchData dengan tipe respons LatestOffersResponse
    let query: string = "";
    if (slug) {
      query += `&slug=${slug}`;
    }
    const responseData = await fetchData<LatestOffersResponse>(
      `${clientAPI}/latest-offers?limit=${limit}${query}`,
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
