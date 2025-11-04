"use server";

import fetchData from "../../services/api/fetchData";
import { clientAPI } from "../../services/api/clientAPI";
import { User } from "@/core/domain/user";

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
