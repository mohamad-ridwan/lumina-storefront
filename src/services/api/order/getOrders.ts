"use server";

import fetchData from "../fetchData";
import { clientAPI } from "../clientAPI";
import { OrdersResponse } from "@/types/order";

interface GetOrdersRequest {
  userId: string;
  status?: "pending";
  page?: number;
  limit?: number;
}

export async function getOrders({
  userId,
  status,
  page = 1,
  limit = 10,
}: GetOrdersRequest): Promise<OrdersResponse> {
  try {
    if (!userId) {
      throw new Error("Invalid parameters for get orders");
    }

    const url = `${clientAPI}/order/orders?userId=${userId}&status=${
      status ?? ""
    }&page=${page}&limit=${limit}`;

    const responseData = await fetchData<OrdersResponse>(url, "GET");

    if (responseData.success) {
      return responseData;
    } else {
      throw new Error(responseData.message || "Failed to get orders");
    }
  } catch (error) {
    console.error("Error get orders:", error);
    throw error;
  }
}
