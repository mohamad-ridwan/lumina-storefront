"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react"; // Menggunakan Lucide React untuk ikon
import { cn } from "@/lib/utils"; // Asumsi Anda memiliki utilitas cn (classnames) dari Shadcn
import { Category } from "@/types/categories"; // Pastikan Anda mengimpor tipe Category dan Collection
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type Props = {
  categories: Category[]; // Mengubah nama prop dari 'category' menjadi 'categories' agar lebih jelas
};

// Komponen Navbar Responsif
const NavbarClient = ({ categories: initialCategories = [] }: Props) => {
  // State untuk mengelola visibilitas menu mobile (hamburger)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State untuk mengelola input pencarian
  const [searchQuery, setSearchQuery] = useState("");
  // State untuk menyimpan kategori yang sedang di-hover di menu desktop
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [hasShadow, setHasShadow] = useState<boolean>(false);

  const router = useRouter();
  const { keywords } = useParams();

  // Set kategori yang di-hover pertama kali saat komponen dimuat atau kategori berubah
  useEffect(() => {
    if (initialCategories.length > 0 && !hoveredCategory) {
      setHoveredCategory(initialCategories[0]);
    }
  }, [initialCategories, hoveredCategory]);

  useEffect(() => {
    if (typeof keywords === "string") {
      setSearchQuery(decodeURIComponent(keywords));
    }
  }, [keywords]);

  useEffect(() => {
    const handleScroll = () => {
      // Aktifkan shadow jika scrollY lebih dari 100px
      if (typeof window !== "undefined" && window.scrollY > 40) {
        // Tambahkan pengecekan window
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    // Tambahkan event listener saat komponen di-mount
    if (typeof window !== "undefined") {
      // Tambahkan pengecekan window
      window.addEventListener("scroll", handleScroll);
    }

    // Bersihkan event listener saat komponen di-unmount
    return () => {
      if (typeof window !== "undefined") {
        // Tambahkan pengecekan window
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Fungsi untuk mengubah status menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handler untuk submit pencarian
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Mencegah refresh halaman
    router.push(`/search/${searchQuery}`);
    // Di sini Anda bisa mengimplementasikan logika pencarian sebenarnya,
    // seperti mengarahkan ke halaman hasil pencarian atau memfilter produk.
  };

  return (
    // Navbar utama dengan latar belakang 'card' dan teks 'foreground' dari tema Shadcn
    // Shadow-md memberikan sedikit bayangan di bawah navbar
    // Sticky top-0 dan z-50 agar navbar selalu terlihat di bagian atas saat di-scroll
    <nav
      className={`bg-card text-foreground ${
        hasShadow ? "shadow-xs" : "shadow-none"
      } sticky top-0 z-50 transition-shadow duration-300`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Bagian Kiri: Logo, Tombol Kategori (Desktop), Search Bar (Desktop) */}
        <div className="flex items-center w-full justify-between border-b py-3">
          <div className="flex items-center space-x-4">
            {/* Logo / Nama Toko */}
            <Link
              href="/"
              className="text-2xl font-bold text-foreground whitespace-nowrap"
            >
              Toko <span className="text-custom-blue">Anda</span>
            </Link>

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
                      <div className="flex w-[700px] h-[350px] p-2">
                        {" "}
                        {/* Menyesuaikan ukuran keseluruhan dropdown */}
                        {/* Section Kiri: Kategori Utama */}
                        <ul className="w-1/3 border-r pr-4 overflow-y-auto">
                          {initialCategories.map((cat) => (
                            <li
                              key={cat._id}
                              onMouseEnter={() => setHoveredCategory(cat)}
                              className={cn(
                                "cursor-pointer rounded-md transition-colors duration-200",
                                hoveredCategory?._id === cat._id
                                  ? "bg-accent text-accent-foreground" // Gaya saat di-hover/aktif
                                  : "hover:bg-accent hover:text-accent-foreground"
                              )}
                            >
                              <Link href={`/c1/${cat.slug}`} passHref>
                                <NavigationMenuLink asChild>
                                  <span className="text-sm font-medium">
                                    {cat.name}
                                  </span>
                                </NavigationMenuLink>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {/* Section Kanan: Koleksi dari Kategori yang Di-hover */}
                        <div className="w-2/3 pl-6 overflow-y-auto">
                          {hoveredCategory ? (
                            <>
                              <h4 className="text-lg font-semibold text-foreground mb-3">
                                Koleksi {hoveredCategory.name}
                              </h4>
                              {hoveredCategory.collections &&
                              hoveredCategory.collections.length > 0 ? (
                                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                                  {hoveredCategory.collections.map(
                                    (collection) => (
                                      <li key={collection._id}>
                                        <Link
                                          href={`/c2/${collection.slug}`}
                                          passHref
                                        >
                                          <NavigationMenuLink asChild>
                                            <span className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                              <div className="text-sm font-medium leading-none">
                                                {collection.name}
                                              </div>
                                              {/* Anda bisa menambahkan deskripsi koleksi jika ada di tipe Collection */}
                                              {/* {collection.description && (
                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                              {collection.description}
                                            </p>
                                          )} */}
                                            </span>
                                          </NavigationMenuLink>
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              ) : (
                                <p className="text-muted-foreground text-sm">
                                  Tidak ada koleksi untuk kategori ini.
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="text-muted-foreground text-sm">
                              Arahkan mouse ke kategori untuk melihat
                              koleksinya.
                            </p>
                          )}
                        </div>
                      </div>
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
                    <Link
                      href={`/c1/${cat.slug}`} // Contoh link ke halaman kategori
                      className="block w-full px-2 py-2 text-foreground hover:text-custom-blue hover:bg-muted rounded-md transition-colors duration-200"
                      onClick={toggleMobileMenu} // Tutup menu setelah klik
                    >
                      {cat.name}
                    </Link>
                    {/* Tampilkan sub-kategori jika ada */}
                    {cat.collections && cat.collections.length > 0 && (
                      <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-2">
                        {cat.collections.map((collection) => (
                          <li key={collection._id}>
                            <Link
                              href={`/c2/${collection.slug}`} // Contoh link ke halaman sub-kategori
                              className="block w-full px-2 py-1 text-muted-foreground hover:text-custom-blue hover:bg-muted rounded-md transition-colors duration-200 text-sm"
                              onClick={toggleMobileMenu}
                            >
                              {collection.name}
                            </Link>
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
