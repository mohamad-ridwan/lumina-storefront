/**
 * @fileoverview Shared Types Index
 * Central export for all shared types
 */

// Re-export domain types
export type * from './product';
export type * from './cart';
export type * from './user';
export type * from './categories';

// Common UI types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}