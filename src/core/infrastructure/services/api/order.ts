"use server";

import fetchData from "./fetchData";
import { clientAPI } from "./clientAPI";
import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrderDetailRequest,
  GetOrdersRequest,
  OrdersResponse,
  PayOrderRequest,
  PayOrderResponse,
} from "@/core/domain/order";

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
      throw new Error(responseData.message || "Failed to create order");
    }
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}
