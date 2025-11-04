"use server";

import fetchData from "../../services/api/fetchData";
import { clientAPI } from "../../services/api/clientAPI";
import { CreateOrderResponse } from "@/shared/types/order";

interface GetOrderDetailRequest {
  orderId: string;
}

export async function getOrderDetail({
  orderId,
}: GetOrderDetailRequest): Promise<CreateOrderResponse> {
  try {
    if (!orderId) {
      throw new Error("Invalid parameters for get order detail");
    }

    const url = `${clientAPI}/order/order-detail?orderId=${orderId}`;

    const responseData = await fetchData<CreateOrderResponse>(url, "GET");

    if (responseData.success) {
      return responseData;
    } else {
      throw new Error(responseData.message || "Failed to get order detail");
    }
  } catch (error) {
    console.error("Error get order detail:", error);
    throw error;
  }
}
