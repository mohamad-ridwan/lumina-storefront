import { clientAPI } from "./clientAPI";
import fetchData from "./fetchData";

type Theme = "theme1" | "theme2";

export async function getTheme(): Promise<Theme> {
  try {
    const responseData = await fetchData<Theme>(
      `${clientAPI}/users/theme`,
      "GET"
    );

    if (responseData) {
      return responseData;
    } else {
      throw new Error("Theme retrieval failed");
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw new Error("Theme retrieval failed");
  }
}
