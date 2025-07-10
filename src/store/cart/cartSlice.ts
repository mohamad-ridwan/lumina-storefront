import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { GetCartResponse, CartItem } from "@/types/cart";
import { addCart } from "@/services/api/cart/addCart";
import { fetchCart } from "@/services/api/cart/getCart";
import { updateCartQuantity } from "@/services/api/cart/updateCartQuantity";
import { removeFromCart } from "@/services/api/cart/removeFromCart";

// Types untuk cart state
interface CartState {
  cartItems: CartItem[];
  currentCartTotalUniqueItems: number;
  cartTotalPrice: number;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: CartState = {
  cartItems: [],
  currentCartTotalUniqueItems: 0,
  cartTotalPrice: 0,
  isLoading: false,
  error: null,
};

// Async thunk untuk mengambil data cart
export const getCartAsync = createAsyncThunk(
  "cart/getCart",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetchCart({ userId });
      return response;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message || "Failed to get cart");
    }
  }
);

// Async thunk untuk menambah item ke cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (
    params: {
      userId: string;
      shoeId: string;
      selectedVariantId: string | null;
      quantity: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await addCart(params);
      return response;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message || "Failed to add to cart");
    }
  }
);

// Async thunk untuk update quantity cart
export const updateCartQuantityAsync = createAsyncThunk(
  "cart/updateQuantity",
  async (
    params: {
      userId: string;
      shoeId: string;
      selectedVariantId: string | null;
      quantity: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateCartQuantity(params);
      return response;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message || "Failed to update cart quantity");
    }
  }
);

// Async thunk untuk remove item dari cart
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (
    params: {
      userId: string;
      cartId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await removeFromCart(params);
      return response;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message || "Failed to remove from cart");
    }
  }
);

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action untuk clear error
    clearCartError: (state: CartState) => {
      state.error = null;
    },
    // Action untuk reset cart (untuk logout)
    resetCart: (state: CartState) => {
      state.cartItems = [];
      state.currentCartTotalUniqueItems = 0;
      state.cartTotalPrice = 0;
      state.error = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CartState>) => {
    // Get Cart
    builder
      .addCase(getCartAsync.pending, (state: CartState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCartAsync.fulfilled, (state: CartState, action: PayloadAction<GetCartResponse>) => {
        state.isLoading = false;
        state.cartItems = action.payload.cartItems;
        state.currentCartTotalUniqueItems = action.payload.currentCartTotalUniqueItems;
        state.cartTotalPrice = action.payload.cartTotalPrice;
        state.error = null;
      })
      .addCase(getCartAsync.rejected, (state: CartState, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
    // Add to Cart
    builder
      .addCase(addToCartAsync.pending, (state: CartState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state: CartState, action: PayloadAction<GetCartResponse>) => {
        state.isLoading = false;
        state.cartItems = action.payload.cartItems;
        state.currentCartTotalUniqueItems = action.payload.currentCartTotalUniqueItems;
        state.cartTotalPrice = action.payload.cartTotalPrice;
        state.error = null;
      })
      .addCase(addToCartAsync.rejected, (state: CartState, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
    // Update Cart Quantity
    builder
      .addCase(updateCartQuantityAsync.pending, (state: CartState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartQuantityAsync.fulfilled, (state: CartState, action: PayloadAction<GetCartResponse>) => {
        state.isLoading = false;
        state.cartItems = action.payload.cartItems;
        state.currentCartTotalUniqueItems = action.payload.currentCartTotalUniqueItems;
        state.cartTotalPrice = action.payload.cartTotalPrice;
        state.error = null;
      })
      .addCase(updateCartQuantityAsync.rejected, (state: CartState, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
    // Remove from Cart
    builder
      .addCase(removeFromCartAsync.pending, (state: CartState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCartAsync.fulfilled, (state: CartState, action: PayloadAction<GetCartResponse>) => {
        state.isLoading = false;
        state.cartItems = action.payload.cartItems;
        state.currentCartTotalUniqueItems = action.payload.currentCartTotalUniqueItems;
        state.cartTotalPrice = action.payload.cartTotalPrice;
        state.error = null;
      })
      .addCase(removeFromCartAsync.rejected, (state: CartState, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCartError, resetCart } = cartSlice.actions;
export default cartSlice.reducer;