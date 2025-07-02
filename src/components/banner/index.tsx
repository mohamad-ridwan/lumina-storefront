"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Impor komponen Carousel dari Shadcn UI
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

/**
 * @fileoverview Banner Carousel Component
 * This component displays a responsive image carousel for banners on the homepage.
 */

/**
 * Interface untuk struktur data Banner.
 */
export interface Banner {
  image: string; // URL gambar banner
}

type BannerCarouselProps = {
  banners: Banner[]; // Array objek Banner yang akan ditampilkan
};

// Komponen BannerCarousel
const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
  if (!banners || banners.length === 0) {
    return null; // Jangan render apa pun jika tidak ada banner
  }

  return (
    <div className="w-full mx-auto">
      {" "}
      {/* Container responsif */}
      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full">
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="flex items-center justify-center rounded-lg overflow-hidden">
                  <Image
                    src={banner.image}
                    alt={`Banner ${index + 1}`}
                    height={400}
                    width={768}
                    className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-lg"
                    style={{ aspectRatio: "16/9" }}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Tombol navigasi Previous dan Next untuk Carousel */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
