import { OrderRepository } from "../order";
import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrdersRequest,
  OrdersResponse,
  GetOrderDetailRequest,
  PayOrderRequest,
  PayOrderResponse,
} from "@/core/domain/order";
import { getOrders } from "../../services/api/order/getOrders";
import { getOrderDetail } from "../../services/api/order/getOrderDetail";
import { payOrder } from "../../services/api/order/payOrder";
import { createOrder } from "../../services/api/order/createOrder";

export const orderRepositoryImpl: OrderRepository = {
  async createOrder(params: CreateOrderRequest): Promise<CreateOrderResponse> {
    return await createOrder(params);
  },
  async getOrders(params: GetOrdersRequest): Promise<OrdersResponse> {
    return await getOrders(params);
  },
  async getOrderDetail(
    params: GetOrderDetailRequest
  ): Promise<CreateOrderResponse> {
    return await getOrderDetail(params);
  },
  async payOrder(params: PayOrderRequest): Promise<PayOrderResponse> {
    return await payOrder(params);
  },
};
