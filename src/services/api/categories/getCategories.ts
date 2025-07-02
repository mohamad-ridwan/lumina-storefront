/**
 * @fileoverview API Service for Categories
 * This file provides a specific function to fetch category data from the API.
 */

import { Category, CategoryResponse } from "@/types/categories";
import fetchData from "../fetchData";
import { clientAPI } from "../clientAPI";

/**
 * Mengambil daftar kategori dan sub-kategori dari API.
 *
 * @returns {Promise<Category[]>} Promise yang akan me-resolve dengan array objek Category.
 * @throws {ApiError} Jika permintaan API gagal.
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    // Menggunakan fetchData dengan tipe respons CategoryResponse
    const responseData = await fetchData<CategoryResponse>(
      `${clientAPI}/categories`,
      "GET"
    );

    // Memastikan respons sukses dan mengembalikan array kategori
    if (responseData.success) {
      return responseData.categories;
    } else {
      // Jika 'success' adalah false, lempar error dengan pesan dari API
      throw new Error(responseData.message || "Gagal mengambil kategori.");
    }
  } catch (error) {
    // Re-throw error yang sudah ditangani oleh fetchData atau error lainnya
    console.error("Error saat mengambil kategori:", error);
    throw error; // Biarkan error ditangani lebih lanjut oleh pemanggil
  }
}

// Contoh penggunaan (opsional, untuk demonstrasi)
/*
async function loadCategories() {
  try {
    const categories = await fetchCategories();
    console.log("Kategori berhasil diambil:", categories);
  } catch (error) {
    console.error("Gagal memuat kategori:", error);
  }
}

// Panggil fungsi untuk memuat kategori saat aplikasi dimulai (contoh)
// loadCategories();
*/
