"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BaseBannerCardProps {
  label?: string;
  title?: string;
  description?: string;
  btnName?: string;
  imageUrl?: string;
  onButtonClick?: () => void;
  slug?: string;
}

const BaseBannerCard: React.FC<BaseBannerCardProps> = ({
  label = "WHAT'S NEW?",
  title = "Autumn is here!",
  description = "Cozy furniture for cold days",
  btnName = "Lebih Lanjut",
  imageUrl = "https://images.unsplash.com/photo-1545289414-1c3cb1c06238?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  onButtonClick,
  slug,
}) => {
  return (
    <div
      className="
        relative flex flex-col sm:flex-row items-stretch justify-between 
        bg-[#F5F5F5] rounded-xl overflow-hidden 
        shadow-xs max-w-[900px] mx-auto
        w-full
      "
    >
      {/* Bagian Kiri: Teks */}
      <div
        className="
          flex flex-col justify-center 
          flex-1 p-6 sm:p-8 
          z-10
          text-left
        "
      >
        {label && (
          <p
            className="
              text-xs font-normal text-gray-600 
              mb-2 bg-[#fff] w-fit p-1 rounded-sm
            "
          >
            {label}
          </p>
        )}
        {title && (
          <h2
            className="
              text-lg font-semibold text-gray-800 
              mb-2 sm:mb-3 leading-tight max-w-[230px]
            "
          >
            {title}
          </h2>
        )}
        {description && (
          <p
            className="
              text-xs text-gray-700 
              mb-5 sm:mb-8 leading-relaxed max-w-[230px]
              line-clamp-2
            "
          >
            {description}
          </p>
        )}
        {/* Menggunakan komponen Button dari Shadcn */}
        {slug && (
          <Link href={slug} className="w-fit">
            <Button
              onClick={onButtonClick}
              // Anda bisa menggunakan prop 'variant' bawaan shadcn jika sudah ada yang biru
              // Misalnya: variant="default" (jika default Anda biru)
              // Atau variant="blue" jika Anda telah menambahkan varian kustom biru di themes.ts
              // Tapi untuk kontrol warna HEX yang spesifik, kita bisa override dengan className
              className="
            cursor-pointer
            bg-[#4285F4] text-white 
            hover:bg-[#357ae8]
            py-3 px-3
            text-sm font-normal
            rounded-full
            max-w-[120px] mx-0 w-fit 
            transition-colors duration-300
          "
            >
              {btnName}
            </Button>
          </Link>
        )}
      </div>

      {/* Bagian Kanan: Gambar Latar Belakang Melingkar */}
      {imageUrl && (
        <div
          className="
            absolute
            w-[300px] h-[300px]
            sm:w-[400px] sm:h-[400px]
            md:w-[500px] md:h-[500px]
            lg:w-[600px] lg:h-[600px]
            
            rounded-full 

            right-[-100px] bottom-[-50px]
            sm:right-[-200px] sm:bottom-[-80px]
            md:right-[-150px] md:bottom-[-125px]
            lg:right-[-300px] lg:bottom-[-180px]
            
            overflow-hidden 
            pointer-events-none 
            "
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom right",
            zIndex: 0,
          }}
        >
          {/* Overlay opsional untuk efek visual */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-gray-50/20"></div>
        </div>
      )}
    </div>
  );
};

export default BaseBannerCard;
