/**
 * @fileoverview Product Repository
 * Infrastructure layer for product data access
 */

import {
  Product,
  ProductCollection,
  ProductSearchCriteria,
} from "@/core/domain/product";
import { httpClient } from "../services/httpClient";

export interface ProductRepository {
  getById(id: string): Promise<Product>;
  getBySlug(slug: string): Promise<Product>;
  search(criteria: ProductSearchCriteria): Promise<ProductCollection>;
  getLatestOffers(page?: number, limit?: number): Promise<ProductCollection>;
  getByCategory(
    categorySlug: string,
    page?: number,
    limit?: number
  ): Promise<ProductCollection>;
}

interface ApiProductResponse {
  success: boolean;
  message: string;
  data: any; // Will be mapped to Product
}

interface ApiProductsResponse {
  success: boolean;
  message: string;
  total: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  sort?: "termurah" | "termahal" | "terbaru";
  shoes: any[]; // Will be mapped to Product[]
}

class HttpProductRepository implements ProductRepository {
  async getById(id: string): Promise<Product> {
    const response = await httpClient.get<ApiProductResponse>(`/shoes/${id}`);
    return this.mapToProduct(response.data.data);
  }

  async getBySlug(slug: string): Promise<Product> {
    const response = await httpClient.get<ApiProductResponse>(
      `/shoes/slug/${slug}`
    );
    return this.mapToProduct(response.data.shoes[0]);
  }

  async search(criteria: ProductSearchCriteria): Promise<ProductCollection> {
    const params = new URLSearchParams();

    if (criteria.keywords) params.append("search", criteria.keywords);
    if (criteria.category) params.append("category", criteria.category);
    if (criteria.minPrice)
      params.append("minPrice", criteria.minPrice.toString());
    if (criteria.maxPrice)
      params.append("maxPrice", criteria.maxPrice.toString());
    if (criteria.brand) params.append("brand", criteria.brand);
    if (criteria.sort) params.append("sort", criteria.sort);
    if (criteria.page) params.append("page", criteria.page.toString());
    if (criteria.limit) params.append("limit", criteria.limit.toString());

    const queryString = params.toString();
    const url = queryString ? `/api/shoes?${queryString}` : "/api/shoes";

    const response = await httpClient.get<ApiProductsResponse>(url);
    return this.mapToProductCollection(response.data);
  }

  async getLatestOffers(page = 1, limit = 12): Promise<ProductCollection> {
    const response = await httpClient.get<ApiProductsResponse>(
      `/shoes/latest-offers?page=${page}&limit=${limit}`
    );
    return this.mapToProductCollection(response.data);
  }

  async getByCategory(
    categorySlug: string,
    page = 1,
    limit = 12
  ): Promise<ProductCollection> {
    const response = await httpClient.get<ApiProductsResponse>(
      `/shoes/category/${categorySlug}?page=${page}&limit=${limit}`
    );
    return this.mapToProductCollection(response.data);
  }

  private mapToProduct(data: any): Product {
    return {
      _id: data._id,
      name: data.name,
      brand: data.brand,
      label: data.label,
      newArrival: data.newArrival,
      description: data.description,
      category: data.category || [],
      slug: data.slug,
      image: data.image,
      price: data.price,
      stock: data.stock,
      variantAttributes: data.variantAttributes || [],
      variants: data.variants || [],
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  private mapToProductCollection(data: ApiProductsResponse): ProductCollection {
    return {
      products: data.shoes.map((shoe) => this.mapToProduct(shoe)),
      total: data.total,
      limit: data.limit,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      sort: data.sort,
    };
  }
}

export const productRepository = new HttpProductRepository();
