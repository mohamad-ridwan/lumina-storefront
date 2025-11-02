/**
 * @fileoverview Order Domain Entities
 * Core domain models for order management
 */

import { CartItem } from './cart';

/**
 * Order status enumeration
 */
export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled';

/**
 * Payment status enumeration
 */
export type PaymentStatus = 
  | 'pending' 
  | 'paid' 
  | 'failed' 
  | 'refunded';

/**
 * Shipping address value object
 */
export interface ShippingAddress {
  readonly street: string;
  readonly city: string;
  readonly state: string;
  readonly zipCode: string;
  readonly country: string;
}

/**
 * Order item entity
 */
export interface OrderItem extends Omit<CartItem, '_id'> {
  readonly orderId: string;
}

/**
 * Order aggregate root
 */
export interface Order {
  readonly _id: string;
  readonly userId: string;
  readonly items: readonly OrderItem[];
  readonly totalAmount: number;
  readonly status: OrderStatus;
  readonly paymentStatus: PaymentStatus;
  readonly shippingAddress: ShippingAddress;
  readonly createdAt: string;
  readonly updatedAt: string;
}

/**
 * Create order command
 */
export interface CreateOrderCommand {
  readonly userId: string;
  readonly items: readonly CartItem[];
  readonly shippingAddress: ShippingAddress;
}

/**
 * Update order status command
 */
export interface UpdateOrderStatusCommand {
  readonly orderId: string;
  readonly status: OrderStatus;
}

/**
 * Process payment command
 */
export interface ProcessPaymentCommand {
  readonly orderId: string;
  readonly paymentMethod: string;
  readonly amount: number;
}