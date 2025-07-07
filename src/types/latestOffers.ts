/**
 * @fileoverview Type Definitions for Latest Offers Data
 * These interfaces define the structure for promotional offers or banners
 * fetched from the API.
 */

/**
 * Interface untuk objek penawaran tunggal (offer).
 */
export interface LatestOffer {
  _id: string;
  label: string;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  isActive: boolean;
  createdAt: string; // Tanggal dalam format ISO string
  updatedAt: string; // Tanggal dalam format ISO string
  __v: number; // Versi dokumen (biasanya digunakan oleh MongoDB/Mongoose)
}

/**
 * Interface untuk struktur respons API lengkap saat mengambil daftar penawaran terbaru.
 */
export interface LatestOffersResponse {
  success: boolean;
  count: number;
  data: LatestOffer[]; // Array dari objek LatestOffer
  message: string;
}
