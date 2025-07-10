import fetchData from "../fetchData";
import { clientAPI } from "../clientAPI";

interface RemoveFromCartRequest {
  userId: string;
  cartItemId: string;
}

interface RemoveFromCartResponse {
  success: boolean;
  message: string;
}

export async function removeFromCart({
  userId,
  cartItemId,
}: RemoveFromCartRequest): Promise<RemoveFromCartResponse> {
  try {
    if (!userId || !cartItemId) {
      throw new Error("User ID and Cart Item ID are required.");
    }

    const url = `${clientAPI}/cart/remove`;
    
    const requestBody = {
      userId,
      cartItemId,
    };

    const responseData = await fetchData<RemoveFromCartResponse>(
      url,
      "DELETE",
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