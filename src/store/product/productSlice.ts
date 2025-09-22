import { ActiveProductImg } from "@/types/store/product";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ProductState {
  activeProductImg: ActiveProductImg;
}
const initialState: ProductState = {
  activeProductImg: {} as ActiveProductImg,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetActiveProductImg: (state) => {
      state.activeProductImg = {} as ActiveProductImg;
    },
    setActiveProductImg: (state, payload: PayloadAction<ActiveProductImg>) => {
      state.activeProductImg = payload.payload;
    },
  },
});

export const { setActiveProductImg, resetActiveProductImg } =
  productSlice.actions;
export default productSlice.reducer;
