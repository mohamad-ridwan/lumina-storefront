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
  titleClassName?: string;
  descriptionClassName?: string;
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
  titleClassName = "text-sm font-semibold text-foreground",
  descriptionClassName = "text-sm text-muted-foreground",
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
      <div className="flex flex-col gap-1">
        {" "}
        {/* Sedikit padding untuk konten teks */}
        {title && <h3 className={titleClassName}>{title}</h3>}
        {description && (
          <div
            className={descriptionClassName}
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default BaseCard;
