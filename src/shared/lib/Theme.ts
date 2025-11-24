import { getTheme } from "@/core/infrastructure/services/api/theme";
import dynamic from "next/dynamic";
// import { ComponentType } from "react";

// export const ThemeComponent = <T extends object = Record<string, unknown>>(
//   path: string
// ): ComponentType<T> => {
//   const currentTheme: string = "theme2";
//   return dynamic(
//     () => import(`@/themes/${currentTheme}/${path}`)
//   ) as unknown as ComponentType<T>;
// };

const themeMap = {
  theme1: {
    Product: dynamic(() => import("@/themes/theme1/app/Product")),
    ProductInfo: dynamic(
      () => import("@/themes/theme1/features/product/ProductInfo")
    ),
  },
  theme2: {
    Product: dynamic(() => import("@/themes/theme2/app/Product")),
    ProductInfo: dynamic(
      () => import("@/themes/theme2/features/product/ProductInfo")
    ),
  },
};

export async function ThemeComponent<T extends object>(
  component:
    | keyof (typeof themeMap)["theme1"]
    | keyof (typeof themeMap)["theme2"]
) {
  const theme = (await getTheme()) as "theme1" | "theme2";
  return themeMap[theme][component] as React.ComponentType<T>;
}
