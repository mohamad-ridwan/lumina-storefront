/**
 * @fileoverview Core Index
 * Central export for core domain, use cases, and infrastructure
 */

// Domain
export * from './domain/product';
export * from './domain/cart';
export * from './domain/user';
export * from './domain/order';

// Use Cases
export * from './usecases/product/getProductBySlug';
export * from './usecases/product/searchProducts';
export * from './usecases/cart/addToCart';
export * from './usecases/cart/getCart';
export * from './usecases/cart/updateCartQuantity';
export * from './usecases/cart/removeFromCart';

// Infrastructure
export * from './infrastructure/services/httpClient';
export * from './infrastructure/services/localStorageService';
export * from './infrastructure/repositories/productRepository';
export * from './infrastructure/repositories/cartRepository';
export * from './infrastructure/repositories/userRepository';
export * from './infrastructure/repositories/categoryRepository';