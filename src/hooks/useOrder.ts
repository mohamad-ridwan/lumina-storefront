"use client";

import { payOrder } from "@/services/api/order/payOrder";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface Props {
  orderId: string;
}

export const useOrder = ({ orderId }: Props) => {
  const [loadingPayOrder, setLoadingPayOrder] = useState<boolean>(false);
  const router = useRouter();

  const handlePayOrder = useCallback(async () => {
    if (loadingPayOrder) return;
    setLoadingPayOrder(true);
    const response = await payOrder({ orderId: orderId });
    setLoadingPayOrder(false);
    if (response.success) {
      router.refresh();
      toast.success("Pesanan Anda telah berhasil melakukan pembayaran");
    } else {
      toast.error(
        response?.message || "Gagal melakukan pembayaran. Mohon coba lagi"
      );
    }
  }, [loadingPayOrder, orderId, router]);

  return {
    handlePayOrder,
    loadingPayOrder,
  };
};
