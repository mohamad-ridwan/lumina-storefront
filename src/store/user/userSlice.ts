import {
  createSlice,
  PayloadAction,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { User, LoginResponse, UserStore } from "@/types/user";
import { getUserProfileAsync, loginAsync } from "./userAction";

// Initial state
const initialState: UserStore = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action untuk clear error
    clearUserError: (state: UserStore) => {
      state.error = null;
    },
    // Action untuk logout
    logout: (state: UserStore) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    // Action untuk set user dari cookie pada server-side
    setUserFromCookie: (
      state: UserStore,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserStore>) => {
    // Login
    builder
      .addCase(loginAsync.pending, (state: UserStore) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginAsync.fulfilled,
        (state: UserStore, action: PayloadAction<LoginResponse>) => {
          state.isLoading = false;
          state.user = action.payload.data;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.error = null;
        }
      )
      .addCase(loginAsync.rejected, (state: UserStore, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    // Get Profile
    builder
      .addCase(getUserProfileAsync.pending, (state: UserStore) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getUserProfileAsync.fulfilled,
        (state: UserStore, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
          state.error = null;
        }
      )
      .addCase(getUserProfileAsync.rejected, (state: UserStore, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearUserError, logout, setUserFromCookie } = userSlice.actions;
export default userSlice.reducer;
