import React from "react";
import {
  Breadcrumb as ShadcnBreadcrumb, // Rename to avoid conflict with component name
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Asumsi path komponen Breadcrumb Shadcn
import { FiChevronRight } from "react-icons/fi"; // Menggunakan ikon chevron kanan dari react-icons/fa
import Link from "next/link";

/**
 * @fileoverview Shadcn Breadcrumb Component
 * This component displays a simple breadcrumb navigation using Shadcn UI components,
 * with customizable text colors and a React-icon separator.
 */

/**
 * Interface untuk setiap item dalam breadcrumb.
 */
interface CustomBreadcrumbItem {
  href: string; // URL tujuan item breadcrumb
  label: string; // Teks yang ditampilkan untuk item
  isCurrent?: boolean; // Menandakan apakah ini adalah halaman saat ini (opsional)
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
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              {item.isCurrent ? (
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
