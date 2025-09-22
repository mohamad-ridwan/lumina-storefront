"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ActiveProductImg } from "@/types/store/product";
import { createSelector } from "reselect";
import { RootState } from "@/store";
import { shallowEqual, useSelector } from "react-redux";

/**
 * @fileoverview Product Image Component for Desktop View.
 * Displays a single large product image with a synchronized thumbnail carousel below.
 */

interface ProductImageDesktopProps {
  images: ActiveProductImg[];
}

const ProductImageDesktop: React.FC<ProductImageDesktopProps> = ({
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState<ActiveProductImg>(
    images[0]
  );
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);

  const memoizedActiveProductImg = createSelector(
    [(state: RootState) => state.product.activeProductImg],
    (activeProductImg) => {
      return activeProductImg;
    }
  );

  const activeProductImg = useSelector(memoizedActiveProductImg, shallowEqual);

  // Inisialisasi gambar yang dipilih saat komponen dimuat atau gambar berubah
  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  useEffect(() => {
    if (activeProductImg) {
      setSelectedImage(activeProductImg);
    }
  }, [activeProductImg]);

  // Sinkronisasi thumbnail carousel dengan gambar yang dipilih
  useEffect(() => {
    if (!thumbnailApi) {
      return;
    }

    // Set indeks thumbnail awal
    const initialIndex = images.indexOf(selectedImage || images[0]);
    if (initialIndex !== -1) {
      setCurrentThumbnailIndex(initialIndex);
      thumbnailApi.scrollTo(initialIndex, true); // Gulir ke thumbnail yang sesuai
    }

    // Listener untuk perubahan slide di thumbnail carousel
    thumbnailApi.on("select", () => {
      const newIndex = thumbnailApi.selectedScrollSnap();
      setCurrentThumbnailIndex(newIndex);
      setSelectedImage(images[newIndex]); // Update gambar besar berdasarkan thumbnail yang digulir
    });

    // Listener untuk klik pada thumbnail
    // Ini adalah fallback jika onSelect tidak langsung dipicu oleh klik
    // atau jika kita ingin memastikan klik thumbnail mengubah gambar besar
    // (meskipun carousel api.scrollTo juga akan memicu onSelect)
  }, [thumbnailApi, images, selectedImage]); // Tambahkan selectedImage ke dependency array

  // Handler untuk mengklik thumbnail
  const handleThumbnailClick = useCallback(
    (index: number) => {
      setSelectedImage(images[index]);
      if (thumbnailApi) {
        thumbnailApi.scrollTo(index); // Gulir carousel ke indeks yang diklik
      }
    },
    [images, thumbnailApi]
  );

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg shadow-sm">
        <p className="text-muted-foreground">Tidak ada gambar yang tersedia.</p>
      </div>
    );
  }

  return (
    <div className="w-full hidden lg:block">
      {/* Gambar Besar Tunggal */}
      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
        {selectedImage ? (
          <Image
            src={selectedImage.imageUrl}
            alt="Product main image"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw" // Optimasi ukuran gambar
            className="object-cover"
            priority // Prioritaskan gambar utama
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/no-image.jpg";
            }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-muted-foreground">
            Memuat Gambar...
          </div>
        )}
      </div>

      {/* Thumbnail Carousel */}
      {images.length > 1 && (
        <Carousel
          setApi={setThumbnailApi} // Set API untuk carousel thumbnail
          opts={{
            align: "start",
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {" "}
            {/* Sesuaikan margin jika perlu */}
            {images.map((img, index) => (
              <CarouselItem key={index} className="basis-1/4 pl-2">
                {" "}
                {/* Menampilkan 4 item per view */}
                <div
                  className={cn(
                    "relative w-full aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-200",
                    index === currentThumbnailIndex
                      ? "border-custom-blue shadow-md"
                      : "border-transparent hover:border-gray-300"
                  )}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <Image
                    src={img.imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, 10vw" // Optimasi ukuran gambar
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/no-image.jpg";
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Tombol navigasi untuk thumbnail carousel */}
          <CarouselPrevious className="left-[-10px] top-1/2 -translate-y-1/2 cursor-pointer" />
          <CarouselNext className="right-[-10px] top-1/2 -translate-y-1/2 cursor-pointer" />
        </Carousel>
      )}
    </div>
  );
};

export default ProductImageDesktop;
