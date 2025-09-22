import { OrderStore } from "@/types/order";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { createOrderAsync } from "./orderAction";

const initialState: OrderStore = {
  order: null,
  isLoadingCreateOrder: false,
  submitOrderError: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<OrderStore>) => {
    builder
      .addCase(createOrderAsync.pending, (state: OrderStore) => {
        state.isLoadingCreateOrder = true;
        state.submitOrderError = null;
      })
      .addCase(createOrderAsync.fulfilled, (state: OrderStore) => {
        state.submitOrderError = null;
        state.isLoadingCreateOrder = false;
      })
      .addCase(createOrderAsync.rejected, (state: OrderStore, action) => {
        state.isLoadingCreateOrder = false;
        state.submitOrderError =
          (action.payload as string) ||
          action.error.message ||
          "Gagal membuat pesanan. Silahkan coba lagi";
      });
  },
});

export const {} = orderSlice.actions;
export default orderSlice.reducer;
