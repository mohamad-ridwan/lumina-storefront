/**
 * @fileoverview Price Formatting Utilities
 * Utilities for formatting currency and prices
 */

export const formatPrice = (price: number, currency = 'IDR'): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatPriceCompact = (price: number): string => {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`;
  }
  if (price >= 1000) {
    return `${(price / 1000).toFixed(1)}K`;
  }
  return price.toString();
};

export const parsePriceFromString = (priceString: string): number => {
  // Remove currency symbols and formatting
  const cleaned = priceString.replace(/[^\d]/g, '');
  return parseInt(cleaned, 10) || 0;
};