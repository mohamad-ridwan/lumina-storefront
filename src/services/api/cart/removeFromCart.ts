"use server";

import fetchData from "../fetchData";
import { clientAPI } from "../clientAPI";
import { GetCartResponse } from "@/types/cart";

interface RemoveFromCartRequest {
  userId: string;
  cartId: string;
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
