export type ThemeStyles = {
  [key: string]: { [key: string]: string };
};

export const themeStyles = async (theme: string, fileName: string) => {
  const styles = await import(
    `@/styles/themes/${theme}/${fileName}.module.css`
  );
  const plain = { ...styles };
  return plain;
};
