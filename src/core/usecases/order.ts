import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrdersRequest,
  OrdersResponse,
  GetOrderDetailRequest,
  PayOrderRequest,
  PayOrderResponse,
} from "../domain/order";
import { orderRepositoryImpl } from "../infrastructure/repositories/impl/order";

const {
  createOrder: createOrderRepo,
  getOrders: getOrdersRepo,
  getOrderDetail: getOrderDetailRepo,
  payOrder: payOrderRepo,
} = orderRepositoryImpl;

export const createOrder = async (
  params: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  return await createOrderRepo(params);
};

export const getOrders = async (
  params: GetOrdersRequest
): Promise<OrdersResponse> => {
  return await getOrdersRepo(params);
};

export const getOrderDetail = async (
  params: GetOrderDetailRequest
): Promise<CreateOrderResponse> => {
  return await getOrderDetailRepo(params);
};

export const payOrder = async (
  params: PayOrderRequest
): Promise<PayOrderResponse> => {
  return await payOrderRepo(params);
};











