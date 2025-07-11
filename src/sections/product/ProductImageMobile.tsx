"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi, // Impor tipe CarouselApi
} from "@/components/ui/carousel";
import Image from "next/image";
import { ActiveProductImg } from "@/types/store/product";
import { createSelector } from "reselect";
import { RootState } from "@/store";
import { shallowEqual, useSelector } from "react-redux";

/**
 * @fileoverview Product Image Component for Mobile View.
 * Displays a carousel of product images with slide numbers instead of navigation buttons,
 * maintaining previous UI styling for image padding and rounding.
 */

interface ProductImageMobileProps {
  images: ActiveProductImg[];
}

const ProductImageMobile: React.FC<ProductImageMobileProps> = ({ images }) => {
  const [api, setApi] = useState<CarouselApi>(); // State untuk menyimpan instance CarouselApi
  const [current, setCurrent] = useState(0); // State untuk menyimpan indeks gambar saat ini (1-based)
  const [count, setCount] = useState(images.length); // State untuk menyimpan total jumlah gambar

  const memoizedActiveProductImg = createSelector(
    [(state: RootState) => state.product.activeProductImg],
    (activeProductImg) => {
      return activeProductImg;
    }
  );

  const activeProductImg = useSelector(memoizedActiveProductImg, shallowEqual);

  // Inisialisasi API carousel dan event listener
  useEffect(() => {
    if (!api) {
      return;
    }

    // Set indeks awal dan total count saat API tersedia
    if (api.scrollSnapList().length === images.length) {
      setCount(api.scrollSnapList().length);
    }

    setCurrent(api.selectedScrollSnap() + 1);

    // Tambahkan event listener untuk perubahan slide
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (api && activeProductImg) {
      // Cari indeks gambar yang cocok dengan activeProductImg._id
      const targetIndex = images.findIndex(
        (img) => img._id === activeProductImg._id
      );

      // Jika gambar ditemukan dan bukan slide yang sedang aktif, gulir ke sana
      if (targetIndex !== -1 && api.selectedScrollSnap() !== targetIndex) {
        api.scrollTo(targetIndex);
      }
    }
  }, [api, activeProductImg, images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-80 bg-gray-100 flex items-center justify-center rounded-lg shadow-sm">
        <p className="text-muted-foreground">Tidak ada gambar yang tersedia.</p>
      </div>
    );
  }

  return (
    <div className="w-full lg:hidden relative">
      {" "}
      {/* Tambahkan relative untuk positioning nomor slide */}
      <Carousel setApi={setApi} className="w-full">
        {" "}
        {/* Menambahkan setApi */}
        {/* Mempertahankan ml-0 pada CarouselContent untuk menghindari jarak samping */}
        <CarouselContent className="ml-0">
          {images.map((img, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="p-1">
                <div className="flex items-center justify-center rounded-lg overflow-hidden border border-input bg-gray-50 shadow-xs">
                  <Image
                    src={img.imageUrl}
                    alt={`Product image ${index + 1}`}
                    width={600} // Lebar gambar yang diharapkan
                    height={400} // Tinggi gambar yang diharapkan (rasio 1:1)
                    className="w-full h-auto object-contain rounded-lg" // Mengembalikan rounded-lg pada Image
                    priority={index === 0} // Prioritaskan gambar pertama untuk LCP
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://placehold.co/800x800/E0E0E0/666666?text=Gambar+Tidak+Tersedia";
                    }}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Tombol navigasi Previous dan Next dihapus */}
      </Carousel>
      {/* Nomor Informasi Slide */}
      {images.length > 1 && ( // Tampilkan nomor slide hanya jika ada lebih dari 1 gambar
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full z-10">
          {current}/{count}
        </div>
      )}
    </div>
  );
};

export default ProductImageMobile;
