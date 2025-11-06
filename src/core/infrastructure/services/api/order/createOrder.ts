"use server";

import fetchData from "../fetchData";
import { clientAPI } from "../clientAPI";
import {
  CreateOrderRequest,
  CreateOrderResponse,
} from "@/core/domain/order";

export async function createOrder(
  params: CreateOrderRequest
): Promise<CreateOrderResponse> {
  try {
    if (!params.userId) {
      throw new Error("Invalid parameters for create order");
    }

    const url = `${clientAPI}/order/create-order?userId=${params.userId}`;

    const requestBody = {
      shippingAddress: params.shippingAddress,
      paymentMethod: params.paymentMethod,
      notes: params.notes,
    };

    const responseData = await fetchData<CreateOrderResponse>(
      url,
      "POST",
      requestBody
    );

    if (responseData.success) {
      return responseData;
    } else {
      throw new Error(
        responseData.message || "Failed to create order"
      );
    }
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}





