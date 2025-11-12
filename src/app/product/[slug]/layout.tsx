export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {process.env.NODE_ENV === "production" && (
        <head>
          <link rel="stylesheet" href="/styles/themes/globals.css" />
          <link rel="stylesheet" href="/styles/themes/theme1/navbar.css" />
        </head>
      )}
      <body>{children}</body>
    </html>
  );
}
