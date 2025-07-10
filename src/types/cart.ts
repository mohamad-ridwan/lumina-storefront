// --- Untuk single item di dalam array cartItems ---
interface VariantOptionValues {
  [key: string]: string; // Contoh: { "Ukuran": "38", "Warna": "Putih" }
}

export interface CartItem {
  _id: string; // ID unik dari item keranjang (dokumen Cart)
  shoeId: string | null; // ID sepatu yang terkait
  name: string; // Nama sepatu (snapshot saat ditambahkan ke keranjang)
  image: string | null; // URL gambar sepatu atau varian
  price: number; // Harga per unit item (snapshot saat ditambahkan ke keranjang)
  quantity: number; // Kuantitas item ini di keranjang
  subtotal: number; // Harga total untuk item ini (price * quantity)
  availableStock: number;
  selectedVariantId: string | null; // ID varian yang dipilih (jika ada)
  variantOptionValues: VariantOptionValues | null; // Objek berisi opsi varian (contoh: { "Ukuran": "38" })
  variantSku: string | null; // SKU varian (jika ada)
  slug: string | null; // Slug dari sepatu
  createdAt: string; // Timestamp kapan item keranjang dibuat (ISO 8601 string)
  updatedAt: string; // Timestamp kapan item keranjang terakhir diperbarui (ISO 8601 string)
}

// --- Untuk keseluruhan respons API ---
export interface GetCartResponse {
  success: boolean;
  message: string;
  cartItems: CartItem[]; // Array dari item-item di keranjang
  currentCartTotalUniqueItems: number; // Total jumlah item unik di keranjang
  cartTotalPrice: number; // Total harga semua item di keranjang
}

// Contoh penggunaan (jika di TypeScript):
// const responseData: GetCartResponse = { ... data dari API ... };
// console.log(responseData.cartItems[0].name);
// console.log(responseData.cartTotalPrice);
