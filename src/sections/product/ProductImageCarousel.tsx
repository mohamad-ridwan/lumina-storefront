"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Impor komponen Carousel dari Shadcn UI
import Image from "next/image"; // Menggunakan next/image untuk optimasi

/**
 * @fileoverview Product Image Carousel Component
 * This component displays a carousel of product images.
 */

/**
 * Props untuk komponen ProductImageCarousel.
 */
interface ProductImageCarouselProps {
  images: string[]; // Array URL gambar produk
}

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
  images,
}) => {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg shadow-sm">
        <p className="text-muted-foreground">Tidak ada gambar yang tersedia.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((imageUrl, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="flex items-center justify-center rounded-lg overflow-hidden border border-input bg-gray-50 shadow-sm">
                  <Image
                    src={imageUrl}
                    alt={`Product image ${index + 1}`}
                    width={800} // Lebar gambar yang diharapkan
                    height={800} // Tinggi gambar yang diharapkan (rasio 1:1)
                    className="w-full h-auto object-contain rounded-lg"
                    priority={index === 0} // Prioritaskan gambar pertama untuk LCP
                    onError={(e) => {
                      e.currentTarget.onerror = null; // Mencegah loop tak terbatas
                      e.currentTarget.src =
                        "https://placehold.co/800x800/E0E0E0/666666?text=Gambar+Tidak+Tersedia";
                    }}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Tombol navigasi Previous dan Next untuk Carousel */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
};

export default ProductImageCarousel;
