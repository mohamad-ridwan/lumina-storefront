import { ActiveProductImg } from "@/types/store/product";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeProductImg: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setActiveProductImg: (state, payload: PayloadAction<ActiveProductImg>) => {
      state.activeProductImg = payload;
    },
  },
});

export const { setActiveProductImg } = productSlice.actions;
export default productSlice.reducer;
