"use client";

import Link from "next/link";

interface OrderSummaryProps {
  totalItems: number;
  totalPrice: number;
  isUpdating?: boolean;
}

export default function OrderSummary({
  totalItems,
  totalPrice,
  isUpdating = false,
}: OrderSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const shippingCost = 15000; // Fixed shipping cost for now
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="bg-white p-6 rounded-lg border h-fit sticky top-30">
      <h2 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h2>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Total Item ({totalItems} produk)
          </span>
          <span className={isUpdating ? "text-gray-400" : "text-gray-900"}>
            {formatPrice(totalPrice)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Ongkos Kirim</span>
          <span className="text-gray-900">{formatPrice(shippingCost)}</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span className={isUpdating ? "text-gray-400" : "text-gray-900"}>
            {formatPrice(finalTotal)}
          </span>
        </div>
      </div>

      <Link href="/checkout">
        <button
          disabled={isUpdating || totalItems === 0}
          className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {isUpdating ? "Memperbarui..." : "Checkout"}
        </button>
      </Link>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Dengan melanjutkan, Anda menyetujui syarat dan ketentuan yang berlaku
      </p>
    </div>
  );
}
