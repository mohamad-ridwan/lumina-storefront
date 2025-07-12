"use server";

import fetchData from "../fetchData";
import { clientAPI } from "../clientAPI";
import { CreateOrderResponse } from "@/types/order";

export interface ShippingAddressRequest {
  fullName: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
}

interface CreateOrderRequest {
  userId: string;
  shippingAddress: ShippingAddressRequest;
  paymentMethod: string;
  notes: string;
}

export async function createOrder({
  userId,
  shippingAddress,
  paymentMethod,
  notes,
}: CreateOrderRequest): Promise<CreateOrderResponse> {
  try {
    if (!userId) {
      throw new Error("Invalid parameters for create order");
    }

    const url = `${clientAPI}/order/create-order?userId=${userId}`;

    const requestBody = {
      shippingAddress,
      paymentMethod,
      notes,
    };

    const responseData = await fetchData<CreateOrderResponse>(
      url,
      "POST",
      requestBody
    );

    if (responseData.success) {
      return responseData;
    } else {
      throw new Error(responseData.message || "Failed to create order");
    }
  } catch (error) {
    console.error("Error create order:", error);
    throw error;
  }
}
