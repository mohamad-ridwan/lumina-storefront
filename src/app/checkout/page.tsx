/**
 * @fileoverview Checkout Page
 * Clean architecture implementation of checkout page
 */

import { Metadata } from 'next';
import ContainerPage from '@/container/ContainerPage';
import CheckoutPageContent from '@/sections/checkout/CheckoutPageContent';

export const metadata: Metadata = {
  title: 'Checkout - Lumina Storefront',
  description: 'Complete your purchase securely',
};

export default function CheckoutPage() {
  return (
    <ContainerPage>
      <div className="py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Checkout
        </h1>
        <CheckoutPageContent />
      </div>
    </ContainerPage>
  );
}