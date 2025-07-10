# Implementasi Add Product to Cart dengan Redux Toolkit (Updated)

## Overview PERBAIKAN
Setelah memperhatikan bahwa ada logic useCart yang sudah ada sebelumnya, saya telah memperbaiki implementasi untuk **mempertahankan semua logic yang sudah ada** sambil menambahkan functionality Redux untuk global cart management.

## ✅ SOLUSI: Dual Hook Structure

### 1. **useCart (Original)** - DIPERTAHANKAN
**File**: `src/hooks/useCart.ts`
- ✅ **TIDAK DIUBAH** - Logic asli tetap utuh
- Interface: `UseCartReturn` dengan `isUpdating`, `updateQuantity`, `removeItem`
- Digunakan oleh: `CartContent.tsx` untuk update cart, remove items
- API: `updateCartQuantity`, `removeFromCart`

```typescript
// ORIGINAL - untuk cart management di cart page
const { isUpdating, updateQuantity, removeItem } = useCart(
  cartItems,
  userId,
  handleCartUpdate
);
```

### 2. **useReduxCart (New)** - TAMBAHAN BARU
**File**: `src/hooks/useCart.ts`
- ✅ **BARU DITAMBAHKAN** - Redux global state management
- Untuk: Add to cart, global cart count, cart initialization
- API: `addCart`, `getCart` via Redux thunks

```typescript
// NEW REDUX - untuk add to cart dan global state
const { addToCart, isLoading, getCart } = useReduxCart();
```

### 3. **useCartCount** - UNTUK NAVBAR
**File**: `src/hooks/useCart.ts`
- Hook khusus untuk menampilkan cart count di navbar
- Menggunakan Redux store

```typescript
// Untuk navbar count
const cartCount = useCartCount();
```

## Files yang Diperbarui

### ✅ Hook Structure (src/hooks/useCart.ts)
```typescript
// ORIGINAL FUNCTION - DIPERTAHANKAN
export function useCart(
  initialCartItems: CartItem[],
  userId: string,
  onCartUpdate?: (updatedItems: CartItem[], newTotal: number) => void
): UseCartReturn

// NEW REDUX HOOKS - DITAMBAHKAN
export const useReduxCart = () => { ... }
export const useCartCount = () => { ... }
```

### ✅ Component Updates
**ProductInfo.tsx**: 
- Changed: `useCart()` → `useReduxCart()`
- Functionality: Add to cart dengan Redux

**CartInitializer.tsx**: 
- Changed: `useCart()` → `useReduxCart()`
- Functionality: Initialize cart data

**NavbarClient.tsx**: 
- Uses: `useCartCount()`
- Functionality: Display cart count

**CartContent.tsx**: 
- Uses: `useCart(cartItems, userId, handleCartUpdate)` (ORIGINAL)
- Functionality: Update, remove cart items

## Penggunaan Hook yang Benar

### 1. Untuk Add Product to Cart (Product Detail Page)
```typescript
import { useReduxCart } from "@/hooks/useCart";

const { addToCart, isLoading } = useReduxCart();

const handleAddToCart = async () => {
  await addToCart({
    userId,
    shoeId,
    selectedVariantId,
    quantity
  });
};
```

### 2. Untuk Cart Management (Cart Page)
```typescript
import { useCart } from "@/hooks/useCart";

const { isUpdating, updateQuantity, removeItem } = useCart(
  cartItems,
  userId,
  handleCartUpdate
);
```

### 3. Untuk Navbar Cart Count
```typescript
import { useCartCount } from "@/hooks/useCart";

const cartCount = useCartCount();
```

### 4. Untuk Cart Initialization
```typescript
import { useReduxCart } from "@/hooks/useCart";

const { getCart } = useReduxCart();
```

## Keuntungan Struktur Ini

### ✅ Backward Compatibility
- Semua logic useCart yang sudah ada tetap berfungsi
- Tidak ada breaking changes
- CartContent.tsx tetap menggunakan logic asli

### ✅ Redux Integration
- Global cart state untuk add to cart
- Real-time cart count di navbar
- Centralized cart management

### ✅ Clear Separation of Concerns
- `useCart`: Cart operations (update, remove)
- `useReduxCart`: Global state management (add, get)
- `useCartCount`: Navbar display only

## Testing Checklist

### ✅ Original Functionality (Harus Tetap Bekerja)
- [ ] Cart page: Update quantity
- [ ] Cart page: Remove items
- [ ] Cart page: Loading states

### ✅ New Redux Functionality
- [ ] Product detail: Add to cart
- [ ] Navbar: Cart count display
- [ ] Global: Cart state persistence

## Summary

**TIDAK ADA LOGIC YANG DIHAPUS** - Semua functionality yang sudah ada dipertahankan 100%, hanya menambahkan Redux layer untuk global state management dan add to cart functionality baru.

Struktur ini memungkinkan:
1. **Legacy cart functionality tetap berjalan** (update, remove di cart page)
2. **New Redux functionality untuk add to cart** (product detail page)
3. **Global cart count di navbar** (real-time updates)

Implementasi sekarang **backward compatible** dan **future-ready**!