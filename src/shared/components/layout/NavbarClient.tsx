"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/components/ui/navigation-menu";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Category } from "@/shared/types/categories";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCartCount } from "@/features/cart/hooks/useCart";
import UserDropdown from "./UserDropdown";

type Props = {
  categories: Category[];
};

const NavbarClient = ({ categories: initialCategories = [] }: Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [hasShadow, setHasShadow] = useState<boolean>(false);

  const router = useRouter();
  const { keywords } = useParams();

  const cartCount = useCartCount();

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
      if (typeof window !== "undefined" && window.scrollY > 40) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/${searchQuery}`);
  };

  return (
    <nav
      className={`bg-card text-foreground ${
        hasShadow ? "shadow-xs" : "shadow-none"
      } sticky top-0 z-50 transition-shadow duration-300`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center w-full justify-between border-b py-3">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-2xl font-bold text-foreground whitespace-nowrap"
            >
              Toko <span className="text-custom-blue">Anda</span>
            </Link>

            {initialCategories.length > 0 && (
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Kategori</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="flex w-[700px] h-[350px] p-2">
                        <ul className="w-1/3 border-r pr-4 overflow-y-auto">
                          {initialCategories.map((cat) => (
                            <li
                              key={cat._id}
                              onMouseEnter={() => setHoveredCategory(cat)}
                              className={cn(
                                "cursor-pointer rounded-md transition-colors duration-200",
                                hoveredCategory?._id === cat._id
                                  ? "bg-accent text-accent-foreground"
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[11px] rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <UserDropdown />

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

      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-card shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="max-h-[calc(100vh-100px)] overflow-y-auto py-4">
          <div className="flex flex-col items-start px-4 space-y-4">
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

            {initialCategories.length > 0 && (
              <div className="w-full">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Kategori
                </h3>
                <ul className="space-y-2">
                  {initialCategories.map((cat) => (
                    <li key={cat._id}>
                      <Link
                        href={`/c1/${cat.slug}`}
                        className="block w-full px-2 py-2 text-foreground hover:text-custom-blue hover:bg-muted rounded-md transition-colors duration-200"
                        onClick={toggleMobileMenu}
                      >
                        {cat.name}
                      </Link>
                      {cat.collections && cat.collections.length > 0 && (
                        <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-2">
                          {cat.collections.map((collection) => (
                            <li key={collection._id}>
                              <Link
                                href={`/c2/${collection.slug}`}
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

            <UserDropdown isMobile />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarClient;