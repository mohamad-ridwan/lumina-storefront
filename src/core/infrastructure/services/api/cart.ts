"use server";

import {
  AddCartQuantityRequest,
  CartQuery,
  GetCartResponse,
  RemoveFromCartRequest,
  UpdateCartQuantityRequest,
} from "@/core/domain/cart";
import { clientAPI } from "./clientAPI";
import fetchData, { ApiError } from "./fetchData";

export async function updateCartQuantity({
  userId,
  shoeId,
  selectedVariantId,
  quantity,
}: UpdateCartQuantityRequest): Promise<GetCartResponse> {
  try {
    if (!userId || !shoeId || quantity < 0) {
      throw new Error("Invalid parameters for updating cart quantity.");
    }

    const url = `${clientAPI}/cart/update-quantity?userId=${userId}`;

    const requestBody = {
      shoeId,
      selectedVariantId,
      quantity,
    };

    const responseData = await fetchData<GetCartResponse>(
      url,
      "POST",
      requestBody
    );

    if (responseData.success) {
      return responseData;
    } else {
      throw new Error(
        responseData.message || "Failed to update cart quantity."
      );
    }
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
}

export async function addCart({
  userId,
  shoeId,
  selectedVariantId,
  quantity,
}: AddCartQuantityRequest): Promise<GetCartResponse> {
  try {
    if (!userId || !shoeId || quantity < 0) {
      throw new Error("Invalid parameters for added cart quantity.");
    }

    const url = `${clientAPI}/cart/add?userId=${userId}`;

    const requestBody = {
      shoeId,
      selectedVariantId: selectedVariantId ?? null,
      quantity,
    };

    const responseData = await fetchData<GetCartResponse>(
      url,
      "POST",
      requestBody
    );

    if (responseData.success) {
      return responseData;
    } else {
      throw new Error(responseData.message || "Failed to added cart quantity.");
    }
  } catch (error) {
    console.error("Error added cart quantity:", error);
    throw new Error(
      (error as ApiError)?.data?.message || "Failed to added cart quantity."
    );
  }
}

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

export async function removeFromCart({
  userId,
  cartId,
}: RemoveFromCartRequest): Promise<GetCartResponse> {
  try {
    if (!userId || !cartId) {
      throw new Error("User ID and Cart Item ID are required.");
    }

    const url = `${clientAPI}/cart/delete?userId=${userId}&cartId=${cartId}`;

    const requestBody = {
      userId,
      cartId,
    };

    const responseData = await fetchData<GetCartResponse>(
      url,
      "POST",
      requestBody
    );

    if (responseData.success) {
      return responseData;
    } else {
      throw new Error(
        responseData.message || "Failed to remove item from cart."
      );
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
}
