/**
 * @fileoverview Application Constants
 * Shared constants used throughout the application
 */

export const API_BASE_URL = 'http://localhost:4001';

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: '/profile',
  ORDERS: '/order',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
} as const;

export const CART = {
  MAX_QUANTITY: 99,
  MIN_QUANTITY: 1,
} as const;

export const SEARCH = {
  MIN_QUERY_LENGTH: 2,
  MAX_QUERY_LENGTH: 100,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const STORAGE_KEYS = {
  CART: 'cart',
  USER: 'user',
  THEME: 'theme',
  SEARCH_HISTORY: 'search_history',
} as const;