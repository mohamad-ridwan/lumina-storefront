import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { User, LoginResponse } from "@/types/user";
import { loginUser } from "@/services/api/auth/login";
import { getUserProfile } from "@/services/api/auth/profile";

// Types untuk user state
interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunk untuk login
export const loginAsync = createAsyncThunk(
  "user/login",
  async (
    credentials: { username: string; password: string; phoneNumber: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginUser(credentials);
      return response;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message || "Failed to login");
    }
  }
);

// Async thunk untuk mendapatkan profile user
export const getUserProfileAsync = createAsyncThunk(
  "user/getProfile",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await getUserProfile(token);
      return response;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message || "Failed to get user profile");
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action untuk clear error
    clearUserError: (state: UserState) => {
      state.error = null;
    },
    // Action untuk logout
    logout: (state: UserState) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    // Action untuk set user dari cookie pada server-side
    setUserFromCookie: (state: UserState, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    // Login
    builder
      .addCase(loginAsync.pending, (state: UserState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state: UserState, action: PayloadAction<LoginResponse>) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
    // Get Profile
    builder
      .addCase(getUserProfileAsync.pending, (state: UserState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfileAsync.fulfilled, (state: UserState, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getUserProfileAsync.rejected, (state: UserState, action) => {
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