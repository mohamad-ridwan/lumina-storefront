"use server";

import {
  LoginRequest,
  LoginResponse,
  ProfileRequest,
  ProfileResponse,
  User,
} from "@/core/domain/user";
import { clientAPI } from "./clientAPI";
import fetchData from "./fetchData";

export async function loginUser({
  username,
  password,
  phoneNumber,
}: LoginRequest): Promise<LoginResponse> {
  try {
    if (!username || !password || !phoneNumber) {
      throw new Error("Username, password, and phone number are required.");
    }

    const url = `${clientAPI}/users/login`;

    const requestBody = {
      username,
      password,
      phoneNumber,
    };

    const responseData = await fetchData<LoginResponse>(
      url,
      "POST",
      requestBody
    );

    if (responseData.token && responseData.data) {
      return responseData;
    } else {
      throw new Error(responseData.message || "Login failed.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function getUserProfile(token: string): Promise<User> {
  try {
    if (!token) {
      throw new Error("Token is required.");
    }

    const url = `${clientAPI}/users/profile`;

    const requestBody: ProfileRequest = {
      token,
    };

    const responseData = await fetchData<ProfileResponse>(
      url,
      "POST",
      requestBody
    );

    if (responseData.data) {
      return responseData.data;
    } else {
      throw new Error(
        "Sesi tidak valid atau autentikasi gagal. Silakan login kembali."
      );
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw new Error(
      "Sesi tidak valid atau autentikasi gagal. Silakan login kembali."
    );
  }
}
