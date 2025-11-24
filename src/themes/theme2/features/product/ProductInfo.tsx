"use client";

import React, { useState, useEffect } from "react";
import { Variant, VariantAttribute } from "@/types/shoes";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/shared/hooks/redux";
import { setActiveProductImg } from "@/store/product/productSlice";
import { useReduxCart } from "@/hooks/useCart";
import { ProductInfoProps } from "@/core/domain/product";

/**
 * @fileoverview Product Info Component - Sportie Theme
 * This component displays detailed product information with a sporty design,
 * including variant selection, quantity input, and add to cart functionality.
 */

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
          initialSelections[attr.name] = attr.options[0];
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
        // Update store image menggunakan value dari props shoe
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
      } else if (!found && shoe.variants.length > 0) {
        setQuantity(1);
      } else {
        createParams([
          {
            name: "quantity",
            value: `${quantity}`,
          },
        ]);
      }
    };

    findMatchingVariant();
  }, [selectedOptions, shoe.variants, quantity, dispatch]);

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
    const minStock = 1;
    if (newQuantity > maxStock) {
      newQuantity = maxStock;
    }
    if (newQuantity < minStock) {
      newQuantity = minStock;
    }

    setQuantity(newQuantity);
  };

  // Tentukan harga yang akan ditampilkan
  const displayPrice = matchedVariant ? matchedVariant.price : shoe.price;
  // Tentukan stok yang akan ditampilkan
  const displayStock = matchedVariant ? matchedVariant.stock : shoe.stock;
  // Tentukan gambar yang akan ditampilkan
  // const displayImage = matchedVariant?.imageUrl || shoe.image;

  // Fungsi untuk mendapatkan gambar representatif untuk opsi varian
  const getOptionImageUrl = (
    attributeName: string,
    optionValue: string
  ): string | undefined => {
    const variantWithOption = shoe.variants.find(
      (v) => v.optionValues[attributeName] === optionValue
    );
    return variantWithOption?.imageUrl;
  };

  // Fungsi untuk memeriksa apakah opsi varian tertentu habis stok
  const isOptionOutOfStock = (
    attributeName: string,
    optionValue: string
  ): boolean => {
    const hypotheticalSelectedOptions = {
      ...selectedOptions,
      [attributeName]: optionValue,
    };

    const matchingVariantForOption = shoe.variants.find((variant) => {
      return Object.keys(hypotheticalSelectedOptions).every(
        (attr) =>
          variant.optionValues[attr] === hypotheticalSelectedOptions[attr]
      );
    });

    return !matchingVariantForOption || matchingVariantForOption.stock === 0;
  };

  // Handler untuk tombol "Tambah ke Keranjang"
  const handleAddToCart = async () => {
    if (displayStock > 0 && quantity > 0) {
      try {
        await addToCart({
          shoeId: shoe._id,
          selectedVariantId: matchedVariant?._id ?? null,
          quantity,
        });
      } catch (error) {
        console.error("Error menambahkan ke keranjang:", error);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-6 px-4 pb-24 lg:pb-4">
      {/* Header Section - Sportie Style */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full">
            SPORTIE
          </span>
          {shoe.newArrival && (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
              NEW
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          {shoe.name}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            Brand:{" "}
            <span className="font-bold text-foreground">{shoe.brand}</span>
          </span>
          {shoe.label && (
            <>
              <span className="text-gray-400">•</span>
              <span>
                Label:{" "}
                <span className="font-bold text-foreground">{shoe.label}</span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Price Section */}
      <div className="space-y-2">
        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
          Rp{displayPrice.toLocaleString("id-ID")}
        </p>
        <p
          className={cn(
            "text-sm font-semibold",
            displayStock > 0 ? "text-green-600" : "text-red-600"
          )}
        >
          {displayStock > 0 ? `${displayStock} unit tersedia` : "Stok habis"}
        </p>
      </div>

      {/* Variant Selection */}
      {shoe.variantAttributes.length > 0 && (
        <div className="space-y-5">
          {shoe.variantAttributes.map((attribute: VariantAttribute) => (
            <div key={attribute._id} className="flex flex-col space-y-3">
              <Label className="text-base font-bold text-foreground uppercase tracking-wide">
                {attribute.name}
              </Label>
              <div className="flex flex-wrap gap-3">
                {attribute.options.map((option: string) => {
                  const isSelected = selectedOptions[attribute.name] === option;
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
                      onClick={() => handleOptionChange(attribute.name, option)}
                      disabled={isOptionCombinedOutOfStock}
                      className={cn(
                        "relative flex items-center justify-center h-11 px-4 rounded-lg text-sm font-bold transition-all duration-200",
                        isOptionCombinedOutOfStock &&
                          "opacity-50 cursor-not-allowed",
                        isSelected
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg scale-105"
                          : "bg-background text-foreground border-2 border-gray-300 hover:border-orange-500 hover:scale-105"
                      )}
                    >
                      {optionImageUrl &&
                      (attribute.name === "Warna" ||
                        attribute.name === "Color") ? (
                        <Image
                          src={optionImageUrl}
                          alt={option}
                          width={28}
                          height={28}
                          className={cn(
                            "rounded-full mr-2 object-cover border-2",
                            isSelected
                              ? "border-white shadow-md"
                              : "border-gray-300"
                          )}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              "https://placehold.co/28x28/E0E0E0/666666?text=X";
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

      {/* Quantity Selector */}
      <div className="flex flex-col space-y-3">
        <Label className="text-base font-bold text-foreground uppercase tracking-wide">
          Kuantitas
        </Label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange("decrement")}
            disabled={quantity <= 1 || displayStock === 0}
            className="w-12 h-12 rounded-lg border-2 hover:border-orange-500 disabled:opacity-50"
          >
            <Minus className="h-5 w-5" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange("input", e.target.value)}
            className="w-20 text-center text-lg font-bold border-2 rounded-lg"
            min={1}
            max={displayStock > 0 ? displayStock : 1}
            disabled={displayStock === 0}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange("increment")}
            disabled={quantity >= displayStock || displayStock === 0}
            className="w-12 h-12 rounded-lg border-2 hover:border-orange-500 disabled:opacity-50"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Add to Cart Button - Desktop */}
      <div className="hidden lg:block">
        <Button
          onClick={handleAddToCart}
          disabled={displayStock === 0 || isLoading}
          className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span>
              Menambahkan...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Tambah ke Keranjang
            </span>
          )}
        </Button>
      </div>

      {/* Product Description */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <h3 className="text-xl font-bold text-foreground">Deskripsi Produk</h3>
        <div
          className="leading-relaxed text-muted-foreground prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: shoe.description }}
        ></div>
      </div>

      {/* Add to Cart Button - Mobile Fixed Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t-2 border-gray-200 shadow-2xl p-4 z-50">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground line-clamp-1">
              {shoe.name}
            </p>
            {matchedVariant && (
              <p className="text-xs text-muted-foreground line-clamp-1">
                {Object.values(matchedVariant.optionValues).join(" / ")}
              </p>
            )}
            <p className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              Rp{displayPrice.toLocaleString("id-ID")}
            </p>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={displayStock === 0 || isLoading}
            className="h-12 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <ShoppingCart className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
