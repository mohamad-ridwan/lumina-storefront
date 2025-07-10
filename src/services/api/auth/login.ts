"use server";

import fetchData from "../fetchData";
import { clientAPI } from "../clientAPI";
import { LoginResponse } from "@/types/user";

interface LoginRequest {
  username: string;
  password: string;
  phoneNumber: string;
}

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