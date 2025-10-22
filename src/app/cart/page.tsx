/**
 * @fileoverview Cart Page
 * Clean architecture implementation of shopping cart page
 */

import { Metadata } from 'next';
import ContainerPage from '@/container/ContainerPage';
import CartPageContent from '@/sections/cart/CartPageContent';

export const metadata: Metadata = {
  title: 'Shopping Cart - Lumina Storefront',
  description: 'Review your selected items and proceed to checkout',
};

export default function CartPage() {
  return (
    <ContainerPage>
      <div className="py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Shopping Cart
        </h1>
        <CartPageContent />
      </div>
    </ContainerPage>
  );
}