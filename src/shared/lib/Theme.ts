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

export const themeMap = {
  theme1: {
    Product: dynamic(() => import("@/themes/theme1/app/Product")),
  },
  theme2: {
    Product: dynamic(() => import("@/themes/theme2/app/Product")),
  },
};

export function ThemeComponent<T extends object>(
  theme: keyof typeof themeMap,
  component: keyof (typeof themeMap)["theme1"]
) {
  return themeMap[theme][component] as React.ComponentType<T>;
}
