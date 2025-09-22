import { configureStore } from "@reduxjs/toolkit";
import product from "./product/productSlice";
import cart from "./cart/cartSlice";
import user from "./user/userSlice";
import order from "./order/orderSlice";

export const store = configureStore({
  reducer: {
    order,
    product,
    cart,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
