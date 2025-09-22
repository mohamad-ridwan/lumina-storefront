"use client";

import { Button } from "@/components/ui/button";
import { useOrder } from "@/hooks/useOrder";

interface Props {
  orderId: string;
}

const PaymentOrder = ({ orderId }: Props) => {
  const { loadingPayOrder, handlePayOrder } = useOrder({ orderId });

  return (
    <Button
      variant="default"
      disabled={loadingPayOrder}
      className="cursor-pointer bg-blue-600 hover:bg-blue-700 min-w-[100px]"
      onClick={handlePayOrder}
    >
      Pay
    </Button>
  );
};

export default PaymentOrder;
