import {
  createOrder,
  getOrderDetail,
  getOrders,
  payOrder,
} from "../../services/api/order";
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







