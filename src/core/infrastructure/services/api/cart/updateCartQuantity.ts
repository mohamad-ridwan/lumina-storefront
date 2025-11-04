"use server";

import fetchData from "../../services/api/fetchData";
import { clientAPI } from "../../services/api/clientAPI";
import { GetCartResponse } from "@/core/domain/cart";

interface UpdateCartQuantityRequest {
  userId: string;
  shoeId: string;
  selectedVariantId: string | null;
  quantity: number;
}

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
