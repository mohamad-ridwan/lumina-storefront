"use server";

import fetchData from "../fetchData";
import { clientAPI } from "../clientAPI";
import { PayOrderResponse } from "@/types/order";

interface PayOrderRequest {
  orderId: string;
}

export async function payOrder({
  orderId,
}: PayOrderRequest): Promise<PayOrderResponse> {
  try {
    if (!orderId) {
      throw new Error("Invalid parameters for pay order");
    }

    const url = `${clientAPI}/order/payment-order?orderId=${orderId}`;

    const responseData = await fetchData<PayOrderResponse>(url, "POST");

    if (responseData.success) {
      return responseData;
    } else {
      throw new Error(responseData.message || "Failed to pay order");
    }
  } catch (error) {
    console.error("Error pay order:", error);
    throw error;
  }
}
