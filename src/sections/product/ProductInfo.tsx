"use client";

import React, { useState, useEffect } from "react";
import { Shoe, Variant, VariantAttribute } from "@/types/shoes"; // Impor tipe Shoe dan turunannya
import { Button } from "@/components/ui/button"; // Impor Button Shadcn
import { Label } from "@/components/ui/label"; // Impor Label Shadcn
import { Input } from "@/components/ui/input"; // Impor Input Shadcn untuk kuantitas
import { Minus, Plus } from "lucide-react"; // Ikon untuk tombol kuantitas
import Image from "next/image"; // Menggunakan next/image untuk optimasi gambar
import { cn } from "@/lib/utils"; // Impor cn untuk menggabungkan classNames
import { useAppDispatch } from "@/hooks/redux";
import { setActiveProductImg } from "@/store/product/productSlice";
import { useReduxCart } from "@/hooks/useCart";
import MobileBottomBar from "@/components/product/MobileBottomBar";

/**
 * @fileoverview Product Info Component
 * This component displays detailed product information including name, price,
 * description, variant selection (using buttons), quantity input, and fixed action buttons.
 */

/**
 * Props untuk komponen ProductInfo.
 */
interface ProductInfoProps {
  shoe: Shoe; // Objek sepatu lengkap
  selectedOptionsParams?: Record<string, string>;
  quantityParams?: number | null;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  shoe,
  selectedOptionsParams,
  quantityParams,
}) => {
  // State untuk menyimpan pilihan varian saat ini
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(selectedOptionsParams as Record<string, string>);
  // State untuk menyimpan varian yang cocok berdasarkan pilihan
  const [matchedVariant, setMatchedVariant] = useState<Variant | null>(null);
  // State untuk kuantitas produk
  const [quantity, setQuantity] = useState(quantityParams ?? 1);

  const dispatch = useAppDispatch();
  const { addToCart, isLoading } = useReduxCart();

  // Inisialisasi pilihan varian pertama kali saat komponen dimuat
  useEffect(() => {
    if (Object.keys(selectedOptions).length === 0) {
      const initialSelections: Record<string, string> = {};
      shoe.variantAttributes.forEach((attr) => {
        if (attr.options.length > 0) {
          initialSelections[attr.name] = attr.options[0]; // Pilih opsi pertama secara default
        }
      });
      setSelectedOptions(initialSelections);
    }
  }, [shoe.variantAttributes]);

  const createParams = (paramsData: { name: string; value: string }[]) => {
    const params = new URLSearchParams(window.location.search);
    if (paramsData.length > 0) {
      paramsData.forEach((p) => {
        params.set(p.name, p.value);
      });
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  // Efek untuk mencocokkan varian setiap kali pilihan berubah
  useEffect(() => {
    const findMatchingVariant = () => {
      const found = shoe.variants.find((variant) => {
        return Object.keys(selectedOptions).every(
          (attrName) =>
            variant.optionValues[attrName] === selectedOptions[attrName]
        );
      });
      if (found) {
        dispatch(
          setActiveProductImg({ _id: found._id, imageUrl: found.imageUrl })
        );
        createParams([
          {
            name: "variant",
            value: found._id,
          },
          {
            name: "quantity",
            value: `${quantity}`,
          },
        ]);
      }
      setMatchedVariant(found || null);
      // Reset quantity if the matched variant changes and stock is less than current quantity
      if (found && quantity > found.stock) {
        setQuantity(found.stock > 0 ? found.stock : 1);
      } else if (!found) {
        setQuantity(1); // Reset to 1 if no variant matches
      }
    };

    findMatchingVariant();
  }, [selectedOptions, shoe.variants, quantity]); // quantity tidak perlu di dependency array ini karena tidak mempengaruhi matchedVariant

  // Handler untuk perubahan pilihan varian
  const handleOptionChange = (attributeName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [attributeName]: value,
    }));
  };

  // Handler untuk perubahan kuantitas
  const handleQuantityChange = (
    type: "increment" | "decrement" | "input",
    value?: string
  ) => {
    let newQuantity = quantity;

    if (type === "increment") {
      newQuantity = quantity + 1;
    } else if (type === "decrement") {
      newQuantity = quantity - 1;
    } else if (type === "input" && value !== undefined) {
      const parsedValue = parseInt(value, 10);
      newQuantity = isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue;
    }

    // Batasi kuantitas agar tidak melebihi stok yang tersedia
    const maxStock = matchedVariant?.stock || shoe.stock;
    if (newQuantity > maxStock) {
      newQuantity = maxStock;
    }
    if (newQuantity < 1) {
      newQuantity = 1; // Minimal kuantitas 1
    }

    setQuantity(newQuantity);
  };

  // Tentukan harga yang akan ditampilkan
  const displayPrice = matchedVariant ? matchedVariant.price : shoe.price;
  // Tentukan stok yang akan ditampilkan
  const displayStock = matchedVariant ? matchedVariant.stock : shoe.stock;
  // Tentukan gambar yang akan ditampilkan di fixed bar (gambar varian jika ada, jika tidak, gambar utama)
  const displayImage = matchedVariant?.imageUrl || shoe.image;

  // Fungsi untuk mendapatkan gambar representatif untuk opsi varian (misalnya warna)
  const getOptionImageUrl = (
    attributeName: string,
    optionValue: string
  ): string | undefined => {
    // Cari varian yang memiliki opsi ini dan ambil gambarnya
    // Ini mungkin tidak sempurna jika ada banyak atribut lain yang mempengaruhi gambar varian,
    // tapi ini adalah pendekatan umum untuk atribut seperti "Warna".
    const variantWithOption = shoe.variants.find(
      (v) => v.optionValues[attributeName] === optionValue
    );
    return variantWithOption?.imageUrl;
  };

  // Fungsi baru untuk memeriksa apakah opsi varian tertentu habis stok
  const isOptionOutOfStock = (
    attributeName: string,
    optionValue: string
  ): boolean => {
    // Buat objek pilihan sementara yang menyertakan opsi yang sedang diperiksa
    const hypotheticalSelectedOptions = {
      ...selectedOptions,
      [attributeName]: optionValue,
    };

    // Cari varian yang cocok dengan semua pilihan hipotetis ini
    const matchingVariantForOption = shoe.variants.find((variant) => {
      return Object.keys(hypotheticalSelectedOptions).every(
        (attr) =>
          variant.optionValues[attr] === hypotheticalSelectedOptions[attr]
      );
    });

    // Jika tidak ada varian yang cocok dengan kombinasi ini, atau jika varian yang cocok memiliki stok 0
    return !matchingVariantForOption || matchingVariantForOption.stock === 0;
  };

  // Handler untuk tombol "Tambah ke Keranjang"
  const handleAddToCart = async () => {
    if (matchedVariant && displayStock > 0 && quantity > 0) {
      try {
        // Untuk demo, saya menggunakan userId yang di-hardcode
        // Dalam implementasi sebenarnya, Anda harus mendapatkan userId dari autentikasi
        const userId = "67e65beb165cb6e6184d63c0"; // TODO: Dapatkan dari auth context

        await addToCart({
          userId,
          shoeId: shoe._id,
          selectedVariantId: matchedVariant._id,
          quantity,
        });

        console.log(
          `Berhasil menambahkan ${quantity}x ${shoe.name} (${JSON.stringify(
            matchedVariant.optionValues
          )}) ke keranjang. Harga: Rp${displayPrice}`
        );
      } catch (error) {
        console.error("Error menambahkan ke keranjang:", error);
        // TODO: Tampilkan notifikasi error ke user
      }
    } else {
      console.log(
        "Tidak dapat menambahkan ke keranjang: Varian tidak dipilih atau stok habis."
      );
      // TODO: Tampilkan pesan error ke user
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-6 px-4 pb-24 lg:pb-4">
        {/* Tambahkan padding-bottom untuk mobile fixed bar */}
        {/* Nama Produk */}
        <h1 className="text-2xl font-semibold text-foreground">{shoe.name}</h1>
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
        <p className="text-3xl font-bold text-custom-blue">
          Rp{displayPrice.toLocaleString("id-ID")}
        </p>
        {/* Pilihan Varian - Tampil di desktop dan mobile */}
        {shoe.variantAttributes.length > 0 && (
          <div className="space-y-4">
            {shoe.variantAttributes.map((attribute: VariantAttribute) => (
              <div key={attribute._id} className="flex flex-col space-y-2">
                <Label className="text-sm font-[500] text-foreground gap-1">
                  {attribute.name}:
                  <span className="font-normal">
                    {matchedVariant?.optionValues[attribute.name]}
                  </span>
                </Label>
                <div className="flex flex-wrap gap-3">
                  {attribute.options.map((option: string) => {
                    const isSelected =
                      selectedOptions[attribute.name] === option;
                    const optionImageUrl = getOptionImageUrl(
                      attribute.name,
                      option
                    );
                    // Periksa apakah opsi ini, dalam kombinasi dengan pilihan lain, habis stok
                    const isOptionCombinedOutOfStock = isOptionOutOfStock(
                      attribute.name,
                      option
                    );

                    return (
                      <Button
                        key={option}
                        variant={isSelected ? "default" : "outline"} // Default untuk aktif, outline untuk tidak aktif
                        onClick={() =>
                          handleOptionChange(attribute.name, option)
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
                          attribute.name === "Color") ? ( // Tampilkan gambar hanya untuk atribut "Warna" atau "Color"
                          <Image
                            src={optionImageUrl}
                            alt={option}
                            width={24}
                            height={24}
                            className={`rounded-full mr-2 object-cover ${
                              isSelected ? "bg-[#1d4ed8]" : "bg-transparent"
                            }`} // Gambar lingkaran kecil
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                "https://placehold.co/24x24/E0E0E0/666666?text=X"; // Fallback placeholder
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
        {/* Status Stok */}
        <p className="text-sm font-medium text-foreground">
          Stok:{" "}
          <span
            className={displayStock > 0 ? "text-green-600" : "text-red-600"}
          >
            {displayStock > 0 ? `${displayStock} tersedia` : "Habis"}
          </span>
        </p>
        {/* Deskripsi Produk */}
        <div className="space-y-2 text-muted-foreground">
          <h3 className="text-lg font-semibold text-foreground">
            Deskripsi Produk
          </h3>
          <p className="leading-relaxed">{shoe.description}</p>
        </div>
      </div>

      {/* Desktop Actions - Hanya tampil di desktop */}
      <div className="hidden lg:flex fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg py-2 px-12 z-40">
        <div className="flex items-center justify-between gap-3 w-full">
          {/* Bagian Kiri: Gambar Produk, Nama, dan Harga */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
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
          <div className="flex items-center gap-2">
            <Label
              htmlFor="quantity-desktop"
              className="text-sm font-semibold text-foreground"
            >
              Kuantitas:
            </Label>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange("decrement")}
              disabled={quantity <= 1 || displayStock === 0}
              className="w-8 h-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              id="quantity-desktop"
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange("input", e.target.value)}
              className="w-16 text-center"
              min={1}
              max={displayStock > 0 ? displayStock : 1}
              disabled={displayStock === 0}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange("increment")}
              disabled={quantity >= displayStock || displayStock === 0}
              className="w-8 h-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {/* Tombol Aksi Desktop */}
          <Button
            onClick={handleAddToCart}
            disabled={displayStock === 0 || !matchedVariant || isLoading}
            className="bg-[#1d4ed8] text-white px-6 py-3 rounded-full font-semibold hover:bg-custom-blue/90 transition-colors duration-200 shadow-md"
          >
            {isLoading ? "Menambahkan..." : "Tambah ke Keranjang"}
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <MobileBottomBar
        shoe={shoe}
        selectedOptions={selectedOptions}
        matchedVariant={matchedVariant}
        quantity={quantity}
        displayPrice={displayPrice}
        displayStock={displayStock}
        displayImage={displayImage}
        onOptionChange={handleOptionChange}
        onQuantityChange={handleQuantityChange}
        onAddToCart={handleAddToCart}
        isOptionOutOfStock={isOptionOutOfStock}
        getOptionImageUrl={getOptionImageUrl}
        isLoading={isLoading}
      />
    </>
  );
};

export default ProductInfo;
