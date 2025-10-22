import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import ProviderClient from "@/store/ProviderClient";
import CartInitializer from "@/components/cart/CartInitializer";
import UserInitializer from "@/components/auth/UserInitializer";
import { Toaster } from "@/shared/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumina Storefront - Premium E-commerce Experience",
  description: "Discover premium products with our modern e-commerce platform built with Next.js 15 and clean architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProviderClient>
          <UserInitializer />
          <CartInitializer />
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ProviderClient>
      </body>
    </html>
  );
}
