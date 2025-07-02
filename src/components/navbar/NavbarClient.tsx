"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Asumsi path komponen Shadcn Button
import { Input } from "@/components/ui/input"; // Asumsi path komponen Shadcn Input
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"; // Impor komponen NavigationMenu dari Shadcn
import {
  Menu, // Ikon untuk menu hamburger
  X, // Ikon untuk menutup menu
  Search, // Ikon untuk search bar
  ShoppingBag, // Ikon untuk keranjang belanja
  UserCircle, // Ikon untuk avatar pengguna
  // ChevronRight, // Tidak lagi diperlukan untuk NavigationMenu default
} from "lucide-react"; // Menggunakan Lucide React untuk ikon
import { cn } from "@/lib/utils"; // Asumsi Anda memiliki utilitas cn (classnames) dari Shadcn
import { Category } from "@/types/categories";

// Komponen ListItem untuk NavigationMenuContent
// Ini adalah helper component untuk item dalam NavigationMenuContent
interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            {children && (
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            )}
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

type Props = {
  categories: Category[]; // Mengubah nama prop dari 'category' menjadi 'categories' agar lebih jelas
};

// Komponen Navbar Responsif
const NavbarClient = ({ categories: initialCategories = [] }: Props) => {
  // Menggunakan initialCategories untuk menghindari konflik nama
  // State untuk mengelola visibilitas menu mobile (hamburger)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State untuk mengelola input pencarian
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi untuk mengubah status menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handler untuk submit pencarian
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Mencegah refresh halaman
    console.log("Mencari:", searchQuery);
    // Di sini Anda bisa mengimplementasikan logika pencarian sebenarnya,
    // seperti mengarahkan ke halaman hasil pencarian atau memfilter produk.
  };

  return (
    // Navbar utama dengan latar belakang 'card' dan teks 'foreground' dari tema Shadcn
    // Shadow-md memberikan sedikit bayangan di bawah navbar
    // Sticky top-0 dan z-50 agar navbar selalu terlihat di bagian atas saat di-scroll
    <nav className="bg-card text-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Bagian Kiri: Logo, Tombol Kategori (Desktop), Search Bar (Desktop) */}
        <div className="flex items-center space-x-4">
          {/* Logo / Nama Toko */}
          <a
            href="#"
            className="text-2xl font-bold text-foreground whitespace-nowrap"
          >
            Toko <span className="text-custom-blue">Anda</span>
          </a>

          {/* Tombol Kategori Menu (Hanya Tampil di Desktop) */}
          {/* Menggunakan Shadcn NavigationMenu untuk kategori */}
          {initialCategories.length > 0 && (
            <NavigationMenu className="hidden lg:flex">
              {" "}
              {/* Pastikan NavigationMenu hanya tampil di desktop */}
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Kategori</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {initialCategories.map((cat) => (
                        <ListItem
                          key={cat._id}
                          href={`/categories/${cat.slug}`}
                          title={cat.name}
                        >
                          {cat.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {/* Anda bisa menambahkan item navigasi lain di sini jika diperlukan, misalnya "Produk Terbaru" */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    Produk
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    Tentang Kami
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}

          {/* Search Bar (Hanya Tampil di Desktop) */}
          {/* Menggunakan Shadcn Input di dalam form untuk fungsionalitas pencarian */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex relative w-64"
          >
            <Input
              type="text"
              placeholder="Cari produk..."
              className="pl-10 pr-4 py-2 rounded-md border border-input focus:ring-ring focus:border-ring w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Ikon Search di dalam input field */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </form>
        </div>

        {/* Bagian Kanan: Ikon Keranjang, Ikon Avatar (Desktop) & Tombol Toggle Menu Mobile */}
        <div className="flex items-center space-x-4">
          {/* Ikon Search (Hanya Tampil di Mobile) */}
          {/* Tombol ini bisa membuka modal pencarian di mobile */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Ikon Keranjang Belanja */}
          {/* Menggunakan Shadcn Button dengan size 'icon' untuk bentuk lingkaran */}
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="h-5 w-5" />
            {/* Badge untuk jumlah item di keranjang */}
            <span className="absolute -top-1 -right-1 bg-custom-blue text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3 {/* Contoh: jumlah item di keranjang */}
            </span>
          </Button>

          {/* Ikon Avatar Pengguna */}
          {/* Menggunakan Shadcn Button dengan size 'icon' */}
          <Button variant="ghost" size="icon">
            <UserCircle className="h-5 w-5" />
          </Button>

          {/* Tombol Toggle Menu Mobile (Hamburger/X) */}
          {/* Hanya tampil di mobile, mengontrol visibilitas menu overlay */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Menu Mobile Overlay */}
      {/* Ditampilkan/disembunyikan berdasarkan state 'isMobileMenuOpen' */}
      {/* Menggunakan transisi untuk efek slide in/out yang halus */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-card shadow-lg py-4 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col items-start px-4 space-y-4">
          {/* Search Bar (Mobile) - ditampilkan di dalam menu mobile */}
          <form onSubmit={handleSearch} className="relative w-full">
            <Input
              type="text"
              placeholder="Cari produk..."
              className="pl-10 pr-4 py-2 rounded-md border border-input focus:ring-ring focus:border-ring w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </form>

          {/* Kategori Menu Mobile */}
          {initialCategories.length > 0 && (
            <div className="w-full">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Kategori
              </h3>
              <ul className="space-y-2">
                {initialCategories.map((cat) => (
                  <li key={cat._id}>
                    <a
                      href={`/categories/${cat.slug}`} // Contoh link ke halaman kategori
                      className="block w-full px-2 py-2 text-foreground hover:text-custom-blue hover:bg-muted rounded-md transition-colors duration-200"
                      onClick={toggleMobileMenu} // Tutup menu setelah klik
                    >
                      {cat.name}
                    </a>
                    {/* Tampilkan sub-kategori jika ada */}
                    {cat.subCategories && cat.subCategories.length > 0 && (
                      <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-2">
                        {cat.subCategories.map((subCat) => (
                          <li key={subCat._id}>
                            <a
                              href={`/categories/${cat.slug}/${subCat.slug}`} // Contoh link ke halaman sub-kategori
                              className="block w-full px-2 py-1 text-muted-foreground hover:text-custom-blue hover:bg-muted rounded-md transition-colors duration-200 text-sm"
                              onClick={toggleMobileMenu}
                            >
                              {subCat.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Link Navigasi Umum (Mobile) */}
          <a
            href="#"
            className="block w-full px-2 py-2 text-foreground hover:text-custom-blue hover:bg-muted rounded-md transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            Beranda
          </a>
          <a
            href="#"
            className="block w-full px-2 py-2 text-foreground hover:text-custom-blue hover:bg-muted rounded-md transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            Produk
          </a>
          <a
            href="#"
            className="block w-full px-2 py-2 text-foreground hover:text-custom-blue hover:bg-muted rounded-md transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            Tentang Kami
          </a>
          <a
            href="#"
            className="block w-full px-2 py-2 text-foreground hover:text-custom-blue hover:bg-muted rounded-md transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            Kontak
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavbarClient;
