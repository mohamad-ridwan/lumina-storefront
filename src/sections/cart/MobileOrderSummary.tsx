'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface MobileOrderSummaryProps {
  totalItems: number;
  totalPrice: number;
  isUpdating?: boolean;
}

export default function MobileOrderSummary({ 
  totalItems, 
  totalPrice, 
  isUpdating = false 
}: MobileOrderSummaryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  const shippingCost = 15000;
  const finalTotal = totalPrice + shippingCost;

  return (
    <>
      {/* Fixed bottom bar for mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{totalItems} produk</p>
            <p className="font-semibold text-lg">
              {formatPrice(finalTotal)}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Detail
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm mx-auto">
                <DialogHeader>
                  <DialogTitle>Ringkasan Pesanan</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Item ({totalItems} produk)</span>
                    <span className={isUpdating ? "text-gray-400" : "text-gray-900"}>
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ongkos Kirim</span>
                    <span className="text-gray-900">{formatPrice(shippingCost)}</span>
                  </div>
                  
                  <hr className="my-3" />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className={isUpdating ? "text-gray-400" : "text-gray-900"}>
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Dengan melanjutkan, Anda menyetujui syarat dan ketentuan yang berlaku
                </p>
              </DialogContent>
            </Dialog>
            
            <Button 
              className="flex-1 min-w-[120px]"
              disabled={isUpdating || totalItems === 0}
            >
              {isUpdating ? 'Memperbarui...' : 'Checkout'}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Spacer for fixed bottom bar */}
      <div className="h-20 md:hidden" />
    </>
  );
}