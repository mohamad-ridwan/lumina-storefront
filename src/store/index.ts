import { configureStore } from "@reduxjs/toolkit";
import product from "./product/productSlice";
import cart from "./cart/cartSlice";

export const store = configureStore({ 
  reducer: { 
    product,
    cart 
  } 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
