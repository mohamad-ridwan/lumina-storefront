import { configureStore } from "@reduxjs/toolkit";
import product from "./product/productSlice";
import cart from "./cart/cartSlice";
import user from "./user/userSlice";

export const store = configureStore({ 
  reducer: { 
    product,
    cart,
    user
  } 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
