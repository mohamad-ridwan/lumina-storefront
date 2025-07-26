/**
 * @fileoverview Type Definitions for Create Order API Response.
 * These interfaces define the structure for the order object
 * and the complete API response upon successful order creation.
 */

import { Pagination } from "./pagination";

/**
 * Interface untuk objek nilai opsi varian.
 * Contoh: { "Ukuran": "35", "Warna": "Hitam" }
 */
export interface VariantOptionValues {
  [key: string]: string;
}

/**
 * Interface untuk detail varian yang disimpan dalam item pesanan.
 * Ini adalah snapshot varian saat pesanan dibuat.
 */
export interface OrderItemVariant {
  _id: string;
  sku: string;
  imageUrl: string;
  optionValues: VariantOptionValues;
  price: number;
  // Stock tidak disertakan di sini karena ini adalah snapshot varian dalam pesanan,
  // bukan data varian master yang mungkin memiliki informasi stok.
}

/**
 * Interface untuk setiap item produk dalam pesanan.
 */
export interface OrderItem {
  shoe: string; // ID sepatu
  selectedVariantId: string; // ID varian yang dipilih
  name: string; // Nama produk
  price: number; // Harga per unit produk saat dipesan
  quantity: number; // Kuantitas produk ini dalam pesanan
  variant: OrderItemVariant; // Detail varian produk
  _id: string; // ID unik dari item pesanan ini
}

/**
 * Interface untuk detail alamat pengiriman.
 */
export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
}

/**
 * Interface untuk objek pesanan (order) yang dikembalikan oleh API.
 * Kini mencakup detail alamat pengiriman, item pesanan, metode pembayaran, dan catatan.
 */
export interface Order {
  _id: string; // ID unik dari pesanan di database
  orderId: string; // ID pesanan yang dapat dibaca manusia (contoh: "ORD-20250712-OXX8AJ")
  publicOrderUrl: string; // URL publik untuk melihat detail pesanan
  totalAmount: number; // Total jumlah pembayaran untuk pesanan ini
  status: string; // Status pesanan (contoh: "pending", "completed", "cancelled")
  orderedAt: string; // Timestamp kapan pesanan dibuat (ISO 8601 string)
  shippingAddress: ShippingAddress; // Detail alamat pengiriman
  items: OrderItem[]; // Array dari item-item yang dipesan
  paymentMethod: string; // Metode pembayaran yang digunakan
  notes?: string; // Catatan tambahan untuk pesanan (opsional)
}

/**
 * Interface untuk keseluruhan respons API setelah berhasil membuat pesanan.
 */
export interface CreateOrderResponse {
  success: boolean; // Menunjukkan apakah operasi berhasil
  message: string; // Pesan status dari API (contoh: "Order created successfully.")
  order: Order; // Objek pesanan yang dibuat, sesuai dengan interface Order
}

export interface OrdersResponse {
  success: boolean;
  message: string;
  data: Order[];
  pagination: Pagination;
}

export interface PayOrderResponse {
  success: boolean;
  message: string;
  data: Order;
}
