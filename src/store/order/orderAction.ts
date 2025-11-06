import { CreateOrderRequest } from "@/core/domain/order";
import { createOrder } from "@/core/usecases/order";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrderAsync = createAsyncThunk(
  "order/create-order",
  async (params: CreateOrderRequest, { rejectWithValue }) => {
    try {
      const response = await createOrder(params);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as Error).message || "Failed to create order"
      );
    }
  }
);
