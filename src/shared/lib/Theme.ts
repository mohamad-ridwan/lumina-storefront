// import { ComponentType } from "react";

// export const ThemeComponent = <T extends object = Record<string, unknown>>(
//   path: string
// ): ComponentType<T> => {
//   const currentTheme: string = "theme2";
//   return dynamic(
//     () => import(`@/themes/${currentTheme}/${path}`)
//   ) as unknown as ComponentType<T>;
// };

type ThemeImporter = () => Promise<{ default: React.ComponentType<never> }>;

type ThemeDefinition = {
  [key: string]: ThemeImporter;
};

export const themeMap: Record<string, ThemeDefinition> = {
  theme1: {
    CategoryPage: () => import("@/themes/theme1/app/Category"),
    HomePage: () => import("@/themes/theme1/app/Home"),
    Product: () => import("@/themes/theme1/app/Product"),
    ProductInfo: () => import("@/themes/theme1/features/product/ProductInfo"),
    AuthLayout: () => import("@/themes/theme1/features/auth/AuthLayout"),
    LoginPageClient: () =>
      import("@/themes/theme1/features/auth/LoginPageClient"),
    RegisterPageClient: () =>
      import("@/themes/theme1/features/auth/RegisterPageClient"),
    ProfilePageClient: () =>
      import("@/themes/theme1/features/auth/ProfilePageClient"),
    CartContent: () => import("@/themes/theme1/features/cart/CartContent"),
    CartPageClient: () =>
      import("@/themes/theme1/features/cart/CartPageClient"),
    CheckoutClient: () =>
      import("@/themes/theme1/features/order/CheckoutClient"),
    OrdersContent: () => import("@/themes/theme1/features/order/OrdersContent"),
    OrderDetailContent: () =>
      import("@/themes/theme1/features/order/OrderDetailContent"),
    ProductContent: () =>
      import("@/themes/theme1/features/product/ProductContent"),
  },
  theme2: {
    CategoryPage: () => import("@/themes/theme2/app/Category"),
    HomePage: () => import("@/themes/theme2/app/Home"),
    Product: () => import("@/themes/theme2/app/Product"),
    ProductInfo: () => import("@/themes/theme2/features/product/ProductInfo"),
    AuthLayout: () => import("@/themes/theme2/features/auth/AuthLayout"),
    LoginPageClient: () =>
      import("@/themes/theme2/features/auth/LoginPageClient"),
    RegisterPageClient: () =>
      import("@/themes/theme2/features/auth/RegisterPageClient"),
    ProfilePageClient: () =>
      import("@/themes/theme2/features/auth/ProfilePageClient"),
    CartContent: () => import("@/themes/theme2/features/cart/CartContent"),
    CartPageClient: () =>
      import("@/themes/theme2/features/cart/CartPageClient"),
    CheckoutClient: () =>
      import("@/themes/theme2/features/order/CheckoutClient"),
    OrdersContent: () => import("@/themes/theme2/features/order/OrdersContent"),
    OrderDetailContent: () =>
      import("@/themes/theme2/features/order/OrderDetailContent"),
    ProductContent: () =>
      import("@/themes/theme2/features/product/ProductContent"),
  },
};

export type ThemeName = keyof typeof themeMap;

export type ThemeComponents<T extends ThemeName> = keyof (typeof themeMap)[T];

export async function loadThemeComponent<P>(
  theme: ThemeName,
  component: string
): Promise<React.ComponentType<P>> {
  const importer = themeMap[theme][component] as () => Promise<{
    default: React.ComponentType<P>;
  }>;

  const mod = await importer();
  return mod.default;
}

// export async function loadThemeComponent(theme: string, component: string) {
//   const themeObj = themeMap["theme1"];

//   if (!themeObj) {
//     throw new Error(`Theme "${theme}" tidak ditemukan`);
//   }

//   const importer = themeObj["Product"];

//   if (!importer) {
//     throw new Error(
//       `Component "${component}" tidak ditemukan di theme "${theme}"`
//     );
//   }

//   const moduleComponent = await importer(); // ini baru module import()
//   return moduleComponent; // return komponen React
// }

// export async function ThemeComponent<T extends object>(
//   component: keyof (typeof themeMap)["theme1"]
// ) {
//   const theme = (await getTheme()) as "theme1" | "theme2";
//   // return (themeMap[theme] as (typeof themeMap)["theme1"])[
//   //   component
//   // ] as React.ComponentType<T>;
//   return themeMap[theme]?.();
// }
