"use client";

import React from "react";
import {
  Pagination as ShadcnPagination, // Rename to avoid conflict
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Asumsi path komponen Pagination Shadcn
import { Pagination } from "@/types/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface BasePaginationProps {
  pagination: Pagination; // Data pagination
  // onPageChange: (page: number) => void; // Callback saat halaman berubah
}

// Komponen BasePagination
const BasePagination: React.FC<BasePaginationProps> = ({
  pagination,
  // onPageChange,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { currentPage, totalPages } = pagination;

  const onPageChange = (page: number) => {
    if (pagination.currentPage !== page) {
      params.delete("page");
      router.replace(`${pathname}?${params.toString()}&page=${page}`);
    }
  };

  // Fungsi untuk menghasilkan array halaman yang akan ditampilkan
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxPagesToShow = 5; // Jumlah maksimal tombol halaman yang akan ditampilkan (termasuk elipsis)

    if (totalPages <= maxPagesToShow) {
      // Tampilkan semua halaman jika total halaman sedikit
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logika untuk menampilkan elipsis
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxPagesToShow / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("ellipsis");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("ellipsis");
        }
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <ShadcnPagination>
      <PaginationContent>
        {/* Tombol Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {/* Nomor Halaman dan Elipsis */}
        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page as number);
                }}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Tombol Next */}
        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};

export default BasePagination;
