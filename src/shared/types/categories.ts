/**
 * @fileoverview Categories Types
 * Types for category navigation and display
 */

export interface Collection {
  _id: string;
  name: string;
  slug: string;
  level: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  level: number;
  collections?: Collection[];
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  categories: Category[];
}