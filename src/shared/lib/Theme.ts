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
    AuthLayout: dynamic(
      () => import("@/themes/theme1/features/auth/AuthLayout")
    ),
    LoginPageClient: dynamic(
      () => import("@/themes/theme1/features/auth/LoginPageClient")
    ),
    RegisterPageClient: dynamic(
      () => import("@/themes/theme1/features/auth/RegisterPageClient")
    ),
    ProfilePageClient: dynamic(
      () => import("@/themes/theme1/features/auth/ProfilePageClient")
    ),
    CartContent: dynamic(
      () => import("@/themes/theme1/features/cart/CartContent")
    ),
    CartPageClient: dynamic(
      () => import("@/themes/theme1/features/cart/CartPageClient")
    ),
    CheckoutClient: dynamic(
      () => import("@/themes/theme1/features/order/CheckoutClient")
    ),
    OrdersContent: dynamic(
      () => import("@/themes/theme1/features/order/OrdersContent")
    ),
    OrderDetailContent: dynamic(
      () => import("@/themes/theme1/features/order/OrderDetailContent")
    ),
    ProductContent: dynamic(
      () => import("@/themes/theme1/features/product/ProductContent")
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
  component: keyof (typeof themeMap)["theme1"]
) {
  const theme = (await getTheme()) as "theme1" | "theme2";
  return (themeMap[theme] as typeof themeMap["theme1"])[component] as React.ComponentType<T>;
}
