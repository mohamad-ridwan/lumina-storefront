"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Shoe, Variant, VariantAttribute } from "@/types/shoes";

/**
 * @fileoverview Mobile Bottom Bar Component
 * This component shows a fixed bottom bar on mobile with product info
 * and opens a dialog for variant selection when "Add to Cart" is clicked.
 */

interface MobileBottomBarProps {
  shoe: Shoe;
  selectedOptions: Record<string, string>;
  matchedVariant: Variant | null;
  quantity: number;
  displayPrice: number;
  displayStock: number;
  displayImage: string;
  onOptionChange: (attributeName: string, value: string) => void;
  onQuantityChange: (
    type: "increment" | "decrement" | "input",
    value?: string
  ) => void;
  onAddToCart: () => void;
  isOptionOutOfStock: (attributeName: string, optionValue: string) => boolean;
  getOptionImageUrl: (
    attributeName: string,
    optionValue: string
  ) => string | undefined;
}

const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  shoe,
  selectedOptions,
  matchedVariant,
  quantity,
  displayPrice,
  displayStock,
  displayImage,
  onOptionChange,
  onQuantityChange,
  onAddToCart,
  isOptionOutOfStock,
  getOptionImageUrl,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddToCartClick = () => {
    if (shoe.variantAttributes.length > 0) {
      // Jika ada varian, buka dialog
      setIsDialogOpen(true);
    } else {
      // Jika tidak ada varian, langsung tambah ke keranjang
      onAddToCart();
    }
  };

  const handleConfirmAddToCart = () => {
    onAddToCart();
    setIsDialogOpen(false);
  };

  return (
    <>
      {/* Fixed Bottom Bar - Hanya tampil di mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg px-4 py-3 z-40">
        <div className="flex items-center justify-between gap-3">
          {/* Bagian Kiri: Gambar Produk, Nama, dan Harga */}
          <div className="hidden sm:flex items-center space-x-3 flex-1 min-w-0">
            <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden border border-input bg-gray-50">
              <Image
                src={displayImage}
                alt={shoe.name}
                fill
                sizes="48px"
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://placehold.co/48x48/E0E0E0/666666?text=No+Image";
                }}
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground line-clamp-1">
                {shoe.name}
              </p>
              {matchedVariant && (
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {Object.values(matchedVariant.optionValues).join(" / ")}
                </p>
              )}
              <p className="text-sm font-bold text-custom-blue">
                Rp{displayPrice.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* Tombol Tambah ke Keranjang */}
          <Button
            onClick={handleAddToCartClick}
            disabled={displayStock === 0}
            className="bg-[#1d4ed8] text-white px-6 py-3 w-full sm:w-fit rounded-full font-semibold hover:bg-custom-blue/90 transition-colors duration-200 shadow-md flex-shrink-0"
          >
            Tambah ke Keranjang
          </Button>
        </div>
      </div>

      {/* Dialog untuk Variant Selection */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[95%] max-h-[90%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pilih Varian Produk</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Informasi Produk */}
            <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
              <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border border-input">
                <Image
                  src={displayImage}
                  alt={shoe.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://placehold.co/64x64/E0E0E0/666666?text=No+Image";
                  }}
                />
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {shoe.name}
                </p>
                {matchedVariant && (
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {Object.values(matchedVariant.optionValues).join(" / ")}
                  </p>
                )}
                <p className="text-base font-bold text-custom-blue">
                  Rp{displayPrice.toLocaleString("id-ID")}
                </p>
                <p className="text-xs text-muted-foreground">
                  Stok:{" "}
                  <span
                    className={
                      displayStock > 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {displayStock > 0 ? `${displayStock} tersedia` : "Habis"}
                  </span>
                </p>
              </div>
            </div>

            {/* Pilihan Varian */}
            {shoe.variantAttributes.length > 0 && (
              <div className="space-y-4">
                {shoe.variantAttributes.map((attribute: VariantAttribute) => (
                  <div key={attribute._id} className="flex flex-col space-y-3">
                    <Label className="text-sm font-[500] text-foreground">
                      {attribute.name}:
                      <span className="font-normal ml-1">
                        {matchedVariant?.optionValues[attribute.name]}
                      </span>
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {attribute.options.map((option: string) => {
                        const isSelected =
                          selectedOptions[attribute.name] === option;
                        const optionImageUrl = getOptionImageUrl(
                          attribute.name,
                          option
                        );
                        const isOptionCombinedOutOfStock = isOptionOutOfStock(
                          attribute.name,
                          option
                        );

                        return (
                          <Button
                            key={option}
                            variant={isSelected ? "default" : "outline"}
                            onClick={() =>
                              onOptionChange(attribute.name, option)
                            }
                            className={cn(
                              `relative flex items-center justify-center h-9 px-3 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
                                isOptionCombinedOutOfStock
                                  ? "!bg-gray-200 !text-gray-500"
                                  : "bg-transparent"
                              }`,
                              "border", // Tambahkan border default
                              isSelected
                                ? "text-[#1d4ed8] border-custom-blue hover:bg-custom-blue/90 border-[#1d4ed8]" // Gaya aktif
                                : "bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground" // Gaya tidak aktif
                            )}
                          >
                            {optionImageUrl &&
                            (attribute.name === "Warna" ||
                              attribute.name === "Color") ? (
                              <Image
                                src={optionImageUrl}
                                alt={option}
                                width={20}
                                height={20}
                                className="rounded-full mr-2 object-cover"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src =
                                    "https://placehold.co/20x20/E0E0E0/666666?text=X";
                                }}
                              />
                            ) : null}
                            {option}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Input Kuantitas */}
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <Label className="text-sm font-semibold text-foreground">
                Kuantitas:
              </Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onQuantityChange("decrement")}
                  disabled={quantity <= 1 || displayStock === 0}
                  className="w-8 h-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => onQuantityChange("input", e.target.value)}
                  className="w-16 text-center"
                  min={1}
                  max={displayStock > 0 ? displayStock : 1}
                  disabled={displayStock === 0}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onQuantityChange("increment")}
                  disabled={quantity >= displayStock || displayStock === 0}
                  className="w-8 h-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tombol Konfirmasi */}
            <div className="flex space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                onClick={handleConfirmAddToCart}
                disabled={displayStock === 0 || !matchedVariant}
                className="flex-1 bg-[#1d4ed8] text-white hover:bg-custom-blue/90"
              >
                Konfirmasi
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MobileBottomBar;
