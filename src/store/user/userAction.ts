import { loginUser, getUserProfile } from "@/core/usecases/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
      return rejectWithValue(
        (error as Error).message || "Failed to get user profile"
      );
    }
  }
);
