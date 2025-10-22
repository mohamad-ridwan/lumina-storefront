/**
 * @fileoverview Product Feature Hook
 * Hook for product-related operations and state management
 */

import { useState, useEffect, useCallback } from 'react';
import { Product, ProductCollection, ProductSearchCriteria } from '@/shared/types/product';
import { getProductBySlugUseCase } from '@/core/usecases/product/getProductBySlug';
import { searchProductsUseCase } from '@/core/usecases/product/searchProducts';

export interface UseProductReturn {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
  getProduct: (slug: string) => Promise<void>;
  clearProduct: () => void;
}

export const useProduct = (): UseProductReturn => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProduct = useCallback(async (slug: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const productData = await getProductBySlugUseCase.execute(slug);
      setProduct(productData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch product';
      setError(errorMessage);
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearProduct = useCallback(() => {
    setProduct(null);
    setError(null);
  }, []);

  return {
    product,
    isLoading,
    error,
    getProduct,
    clearProduct,
  };
};

export interface UseProductSearchReturn {
  products: ProductCollection | null;
  isLoading: boolean;
  error: string | null;
  searchProducts: (criteria: ProductSearchCriteria) => Promise<void>;
  clearResults: () => void;
}

export const useProductSearch = (): UseProductSearchReturn => {
  const [products, setProducts] = useState<ProductCollection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = useCallback(async (criteria: ProductSearchCriteria) => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await searchProductsUseCase.execute(criteria);
      setProducts(results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search products';
      setError(errorMessage);
      setProducts(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setProducts(null);
    setError(null);
  }, []);

  return {
    products,
    isLoading,
    error,
    searchProducts,
    clearResults,
  };
};