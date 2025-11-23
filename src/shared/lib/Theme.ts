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
      () => import("@/themes/theme1/components/product/ProductInfo")
    ),
  },
};

export async function ThemeComponent<T extends object>(
  component: keyof (typeof themeMap)["theme1"]
) {
  const theme = (await getTheme()) as "theme1";
  return themeMap[theme][component] as React.ComponentType<T>;
}
