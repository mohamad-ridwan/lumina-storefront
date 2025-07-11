"use server";

import fetchData from "../fetchData";
import { clientAPI } from "../clientAPI";
import { User } from "@/types/user";

interface ProfileRequest {
  token: string;
}

interface ProfileResponse {
  data: User;
  message: string;
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
      throw new Error(responseData.message || "Failed to get user profile.");
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
}
