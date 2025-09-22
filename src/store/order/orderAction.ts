import { clientAPI } from "@/services/api/clientAPI";
import fetchData from "@/services/api/fetchData";
import { CreateOrderRequest, CreateOrderResponse } from "@/types/order";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrderAsync = createAsyncThunk(
  "order/create-order",
  async (
    { userId, shippingAddress, paymentMethod, notes }: CreateOrderRequest,
    { rejectWithValue }
  ) => {
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
        return rejectWithValue(
          responseData.message || "Failed to create order"
        );
      }
    } catch (error: unknown) {
      return rejectWithValue(
        (error as Error).message || "Failed to create order"
      );
    }
  }
);
