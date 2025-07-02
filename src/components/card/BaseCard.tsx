import Image from "next/image";
import React from "react";

/**
 * @fileoverview Dynamic Card Component
 * This component displays a card with an optional image, title, and description.
 */

/**
 * Props untuk komponen DynamicCard.
 */
interface BaseCardProps {
  image?: string; // URL gambar opsional
  title?: string; // Judul opsional
  description?: string; // Deskripsi opsional
  imgHeight?: number;
  imgWidth?: number;
  imageClassName?: string;
  wrapperImgClassName?: string;
  wrapperCard?: string;
}

// Komponen DynamicCard
const BaseCard: React.FC<BaseCardProps> = ({
  image,
  title,
  description,
  imgHeight = 100,
  imgWidth = 100,
  imageClassName = "w-full h-48 object-cover",
  wrapperImgClassName,
  wrapperCard,
}) => {
  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden gap-3 ${wrapperCard}`}
    >
      {/* Container untuk gambar dengan background abu-abu terang dan shadow */}
      {image && (
        <div className={`shadow-sm overflow-hidden ${wrapperImgClassName}`}>
          <Image
            src={image}
            height={imgHeight}
            width={imgWidth}
            alt={title || "Card image"}
            className={imageClassName}
          />
        </div>
      )}

      {/* Konten teks (judul dan deskripsi) */}
      <div>
        {" "}
        {/* Sedikit padding untuk konten teks */}
        {title && (
          <h3 className="text-sm font-semibold text-foreground mb-1">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};

export default BaseCard;
