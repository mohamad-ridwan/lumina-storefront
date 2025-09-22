/**
 * @fileoverview Global Fetch API Service
 * This service provides a generic function to make API requests,
 * handling dynamic response types and optional JSON request bodies.
 */

/**
 * Interface untuk struktur respons error dari API.
 * Anda bisa menyesuaikannya sesuai dengan format error API Anda.
 */
interface ApiErrorResponse {
  message: string;
  code?: string;
  details?: unknown; // Mengganti 'any' dengan 'unknown' untuk type safety yang lebih ketat
}

/**
 * Custom Error Class untuk menangani error API.
 * Ini memungkinkan kita untuk membedakan error jaringan dari error respons API.
 */
class ApiError extends Error {
  public status: number;
  public data: ApiErrorResponse | null;

  constructor(
    message: string,
    status: number,
    data: ApiErrorResponse | null = null
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Fungsi generik untuk melakukan panggilan API.
 *
 * @template TResponse Tipe data yang diharapkan dari respons API.
 * @template TBody Tipe data untuk body permintaan JSON. Default ke 'unknown' jika tidak disediakan.
 * @param {string} url URL endpoint API.
 * @param {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} method Metode HTTP.
 * @param {TBody} [body] Objek opsional untuk body permintaan JSON.
 * @param {Record<string, string>} [customHeaders] Objek opsional untuk header kustom.
 * @returns {Promise<TResponse>} Promise yang akan me-resolve dengan data respons atau me-reject dengan ApiError.
 */
async function fetchData<TResponse, TBody = unknown>( // Menambahkan TBody sebagai generic type kedua
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  body?: TBody, // Menggunakan TBody untuk parameter body
  customHeaders?: Record<string, string>
): Promise<TResponse> {
  const headers: HeadersInit = {
    Accept: "application/json", // Mengharapkan respons JSON
    ...customHeaders, // Tambahkan header kustom yang diberikan
  };

  // Jika ada body, set Content-Type ke application/json dan stringify body-nya
  let requestBody: string | undefined;
  // Memastikan body bukan undefined atau null sebelum stringify
  if (body !== undefined && body !== null) {
    headers["Content-Type"] = "application/json";
    requestBody = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: requestBody,
      // Anda bisa menambahkan opsi lain di sini, seperti credentials, mode, cache, dll.
      // credentials: 'include', // Contoh: Mengirim cookies dengan cross-origin requests
      // mode: 'cors', // Contoh: Mode CORS
    });

    // Periksa apakah respons HTTP sukses (status 2xx)
    if (!response.ok) {
      let errorData: ApiErrorResponse | null = null;
      try {
        // Coba parsing respons error sebagai JSON
        // Pastikan respons memiliki content-type application/json sebelum parsing
        const errorContentType = response.headers.get("content-type");
        if (errorContentType && errorContentType.includes("application/json")) {
          errorData = await response.json();
        } else {
          // Jika bukan JSON, coba baca sebagai teks atau biarkan null
          const errorText = await response.text();
          errorData = {
            message: errorText || response.statusText,
            code: response.status.toString(),
          };
        }
      } catch (jsonError) {
        // Jika gagal parsing JSON atau membaca teks, respons mungkin kosong
        console.error("Gagal parsing respons error:", jsonError);
        errorData = {
          message: response.statusText || "Unknown error",
          code: response.status.toString(),
        };
      }
      // Buat dan throw custom ApiError
      throw new ApiError(
        `Permintaan API gagal dengan status ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    // Coba parsing respons sebagai JSON.
    // Jika respons kosong (misalnya, untuk DELETE yang sukses), ini bisa gagal.
    // Tangani kasus di mana respons tidak memiliki body JSON.
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data: TResponse = await response.json();
      return data;
    } else {
      // Jika bukan JSON, kembalikan respons kosong atau sesuai kebutuhan
      // Misalnya, jika API mengembalikan 204 No Content
      return {} as TResponse; // Mengembalikan objek kosong yang di-cast ke TResponse
    }
  } catch (error) {
    // Tangani error jaringan atau error lainnya sebelum respons diterima
    if (error instanceof ApiError) {
      // Jika ini sudah ApiError yang kita buat, re-throw saja
      throw error;
    } else if (
      error instanceof TypeError &&
      error.message === "Failed to fetch"
    ) {
      // Ini biasanya error jaringan (offline, CORS issue, dll.)
      throw new ApiError(
        "Gagal terhubung ke server. Periksa koneksi internet Anda.",
        0,
        null
      );
    } else {
      // Error tak terduga lainnya
      console.error(
        "Terjadi kesalahan tak terduga saat melakukan fetch:",
        error
      );
      // Memastikan error yang dilempar selalu ApiError
      throw new ApiError(
        (error as Error).message || "Terjadi kesalahan tak terduga.",
        500,
        null
      );
    }
  }
}

export default fetchData;
