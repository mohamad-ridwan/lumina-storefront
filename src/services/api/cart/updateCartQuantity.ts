import fetchData from "../fetchData";
import { clientAPI } from "../clientAPI";

interface UpdateCartQuantityRequest {
  userId: string;
  cartItemId: string;
  quantity: number;
}

interface UpdateCartQuantityResponse {
  success: boolean;
  message: string;
  cartItem?: {
    _id: string;
    quantity: number;
    subtotal: number;
  };
}

export async function updateCartQuantity({
  userId,
  cartItemId,
  quantity,
}: UpdateCartQuantityRequest): Promise<UpdateCartQuantityResponse> {
  try {
    if (!userId || !cartItemId || quantity < 0) {
      throw new Error("Invalid parameters for updating cart quantity.");
    }

    const url = `${clientAPI}/cart/update-quantity`;
    
    const requestBody = {
      userId,
      cartItemId,
      quantity,
    };

    const responseData = await fetchData<UpdateCartQuantityResponse>(
      url,
      "PUT",
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