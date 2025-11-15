import dynamic from "next/dynamic";
import { ComponentType } from "react";

export const ThemeComponents = <T extends object = Record<string, unknown>>(
  path: string
): ComponentType<T> => {
  const currentTheme: string = "theme2";
  return dynamic(
    () => import(`@/themes/${currentTheme}/${path}`)
  ) as unknown as ComponentType<T>;
};
