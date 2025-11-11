export interface PayOrderRequest {
  orderId: string;
}

export interface GetOrdersRequest {
  userId: string;
  status?: "pending";
  page?: number;
  limit?: number;
}

export interface GetOrderDetailRequest {
  orderId: string;
}

/**
 * @fileoverview Type Definitions for Order Domain
 * These interfaces define the structure for order-related data
 */

import { Pagination } from "@/shared/types/pagination";

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
}

/**
 * Interface untuk setiap item produk dalam pesanan.
 */
export interface OrderItem {
  shoe: string;
  selectedVariantId: string;
  name: string;
  price: number;
  quantity: number;
  variant: OrderItemVariant;
  _id: string;
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
 */
export interface Order {
  _id: string;
  orderId: string;
  publicOrderUrl: string;
  totalAmount: number;
  status: string;
  orderedAt: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  paymentMethod: string;
  notes?: string;
}

/**
 * Interface untuk keseluruhan respons API setelah berhasil membuat pesanan.
 */
export interface CreateOrderResponse {
  success: boolean;
  message: string;
  order: Order;
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

export interface ShippingAddressRequest {
  fullName: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
}

export interface CreateOrderRequest {
  userId: string;
  shippingAddress: ShippingAddressRequest;
  paymentMethod: string;
  notes: string;
}

export interface GetOrdersRequest {
  userId: string;
  status?: "pending";
  page?: number;
  limit?: number;
}

export interface GetOrderDetailRequest {
  orderId: string;
}

export interface PayOrderRequest {
  orderId: string;
}



