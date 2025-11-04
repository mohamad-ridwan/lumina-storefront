"use server";

import fetchData from "../../services/api/fetchData";
import { clientAPI } from "../../services/api/clientAPI";
import { GetCartResponse } from "@/core/domain/cart";

interface AddCartQuantityRequest {
  userId: string;
  shoeId: string;
  selectedVariantId: string | null;
  quantity: number;
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
    throw error;
  }
}
