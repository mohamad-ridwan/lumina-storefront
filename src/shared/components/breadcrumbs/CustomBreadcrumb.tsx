"use client"; // Diperlukan karena menggunakan DropdownMenu yang interaktif

import React from "react";
import {
  Breadcrumb as ShadcnBreadcrumb, // Rename to avoid conflict with component name
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Asumsi path komponen Breadcrumb Shadcn
import { FiChevronRight } from "react-icons/fi"; // Menggunakan ikon chevron kanan dari react-icons/fi
import { BsThreeDots } from "react-icons/bs"; // Menggunakan ikon tiga titik untuk dropdown
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Impor komponen DropdownMenu dari Shadcn

/**
 * @fileoverview Shadcn Breadcrumb Component
 * This component displays a simple breadcrumb navigation using Shadcn UI components,
 * with customizable text colors, a React-icon separator, and conditional dropdowns for categories.
 */

/**
 * Interface untuk setiap item dalam breadcrumb.
 */
interface CustomBreadcrumbItem {
  href: string; // URL tujuan item breadcrumb
  label: string; // Teks yang ditampilkan untuk item
  isCurrent?: boolean; // Menandakan apakah ini adalah halaman saat ini (opsional)
  hasDropdown?: boolean; // Menandakan apakah item ini harus memiliki dropdown (untuk kategori dengan sub-kategori)
  dropdownItems?: { href: string; label: string }[]; // Item untuk dropdown jika hasDropdown true
}

/**
 * Props untuk komponen CustomBreadcrumb.
 */
interface CustomBreadcrumbProps {
  items: CustomBreadcrumbItem[]; // Array dari item breadcrumb
}

// Komponen CustomBreadcrumb
const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({ items }) => {
  return (
    <ShadcnBreadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={item.href || `item-${index}`}>
            {" "}
            {/* Gunakan key yang lebih unik dan stabil */}
            <BreadcrumbItem>
              {item.hasDropdown &&
              item.dropdownItems &&
              item.dropdownItems.length > 0 ? (
                // Tampilkan sebagai DropdownMenu jika hasDropdown true dan ada item dropdown
                <DropdownMenu>
                  <div className="flex items-center gap-1">
                    <Link href={item.href}>{item.label}</Link>
                    <DropdownMenuTrigger className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200 font-light cursor-pointer">
                      <BsThreeDots className="h-4 w-4" />{" "}
                      {/* Ikon tiga titik */}
                    </DropdownMenuTrigger>
                  </div>

                  <DropdownMenuContent align="start">
                    {item.dropdownItems.map((dropdownItem) => (
                      <DropdownMenuItem key={dropdownItem.href} asChild>
                        <Link
                          href={dropdownItem.href}
                          className="cursor-pointer"
                        >
                          {dropdownItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : item.isCurrent ? (
                // Teks untuk halaman saat ini (hitam)
                <BreadcrumbPage className="font-normal text-foreground">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                // Link untuk halaman sebelumnya (abu-abu)
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  {item.label}
                </Link>
              )}
            </BreadcrumbItem>
            {/* Tampilkan pemisah jika bukan item terakhir */}
            {index < items.length - 1 && (
              <BreadcrumbSeparator>
                <FiChevronRight className="h-3 w-3 text-muted-foreground" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  );
};

export default CustomBreadcrumb;
