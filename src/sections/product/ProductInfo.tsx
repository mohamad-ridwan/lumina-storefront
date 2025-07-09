"use client";

import React, { useState, useEffect } from "react";
import { Shoe, Variant, VariantAttribute } from "@/types/shoes"; // Impor tipe Shoe dan turunannya
import { Button } from "@/components/ui/button"; // Impor Button Shadcn
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Impor RadioGroup Shadcn
import { Label } from "@/components/ui/label"; // Impor Label Shadcn

/**
 * @fileoverview Product Info Component
 * This component displays detailed product information including name, price,
 * description, and variant selection.
 */

/**
 * Props untuk komponen ProductInfo.
 */
interface ProductInfoProps {
  shoe: Shoe; // Objek sepatu lengkap
}

const ProductInfo: React.FC<ProductInfoProps> = ({ shoe }) => {
  // State untuk menyimpan pilihan varian saat ini
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  // State untuk menyimpan varian yang cocok berdasarkan pilihan
  const [matchedVariant, setMatchedVariant] = useState<Variant | null>(null);

  // Inisialisasi pilihan varian pertama kali saat komponen dimuat
  useEffect(() => {
    const initialSelections: Record<string, string> = {};
    shoe.variantAttributes.forEach((attr) => {
      if (attr.options.length > 0) {
        initialSelections[attr.name] = attr.options[0]; // Pilih opsi pertama secara default
      }
    });
    setSelectedOptions(initialSelections);
  }, [shoe.variantAttributes]);

  // Efek untuk mencocokkan varian setiap kali pilihan berubah
  useEffect(() => {
    const findMatchingVariant = () => {
      const found = shoe.variants.find((variant) => {
        // Periksa apakah semua pilihan yang dipilih cocok dengan optionValues varian
        return Object.keys(selectedOptions).every(
          (attrName) =>
            variant.optionValues[attrName] === selectedOptions[attrName]
        );
      });
      setMatchedVariant(found || null);
    };

    findMatchingVariant();
  }, [selectedOptions, shoe.variants]);

  // Handler untuk perubahan pilihan varian
  const handleOptionChange = (attributeName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [attributeName]: value,
    }));
  };

  // Tentukan harga yang akan ditampilkan
  const displayPrice = matchedVariant ? matchedVariant.price : shoe.price;
  // Tentukan stok yang akan ditampilkan
  const displayStock = matchedVariant ? matchedVariant.stock : shoe.stock;

  return (
    <div className="flex flex-col space-y-6 px-4">
      {/* Nama Produk */}
      <h1 className="text-4xl font-bold text-foreground">{shoe.name}</h1>

      {/* Brand dan Label */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span>
          Brand:{" "}
          <span className="font-semibold text-foreground">{shoe.brand}</span>
        </span>
        {shoe.label && (
          <>
            <span className="text-gray-300">|</span>
            <span>
              Label:{" "}
              <span className="font-semibold text-foreground">
                {shoe.label}
              </span>
            </span>
          </>
        )}
      </div>

      {/* Harga Produk */}
      <p className="text-5xl font-extrabold text-custom-blue">
        Rp{displayPrice.toLocaleString("id-ID")}
      </p>

      {/* Pilihan Varian */}
      {shoe.variantAttributes.length > 0 && (
        <div className="space-y-4">
          {shoe.variantAttributes.map((attribute: VariantAttribute) => (
            <div key={attribute._id} className="flex flex-col space-y-2">
              <Label className="text-base font-semibold text-foreground">
                {attribute.name}:
              </Label>
              <RadioGroup
                value={selectedOptions[attribute.name]}
                onValueChange={(value) =>
                  handleOptionChange(attribute.name, value)
                }
                className="flex flex-wrap gap-3"
              >
                {attribute.options.map((option: string) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option}
                      id={`${attribute.name}-${option}`}
                    />
                    <Label htmlFor={`${attribute.name}-${option}`}>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      )}

      {/* Status Stok */}
      <p className="text-lg font-medium text-foreground">
        Stok:{" "}
        <span className={displayStock > 0 ? "text-green-600" : "text-red-600"}>
          {displayStock > 0 ? `${displayStock} tersedia` : "Habis"}
        </span>
      </p>

      {/* Deskripsi Produk */}
      <div className="space-y-2 text-muted-foreground">
        <h3 className="text-xl font-semibold text-foreground">
          Deskripsi Produk
        </h3>
        <p className="leading-relaxed">{shoe.description}</p>
      </div>

      {/* Tombol Aksi */}
      <div className="flex space-x-4 mt-6">
        <Button className="bg-custom-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-custom-blue/90 transition-colors duration-200 shadow-md">
          Tambah ke Keranjang
        </Button>
        <Button
          variant="outline"
          className="px-8 py-3 rounded-full font-semibold border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white transition-colors duration-200"
        >
          Beli Sekarang
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
