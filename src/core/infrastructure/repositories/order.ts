import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrdersRequest,
  OrdersResponse,
  GetOrderDetailRequest,
  PayOrderRequest,
  PayOrderResponse,
} from "@/core/domain/order";

export interface OrderRepository {
  createOrder(params: CreateOrderRequest): Promise<CreateOrderResponse>;
  getOrders(params: GetOrdersRequest): Promise<OrdersResponse>;
  getOrderDetail(params: GetOrderDetailRequest): Promise<CreateOrderResponse>;
  payOrder(params: PayOrderRequest): Promise<PayOrderResponse>;
}












