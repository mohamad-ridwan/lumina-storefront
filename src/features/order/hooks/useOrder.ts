/**
 * @fileoverview Order Hook
 * Order feature hook for order management and checkout
 */

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import z from "zod";
import { AppDispatch } from "@/store";
import { createOrderAsync } from "@/store/order/orderAction";
import {
  selectIsLoadingCreateOrder,
  selectSubmitOrderError,
  selectUserAuthStatus,
} from "@/store/selectors";
import { CartItem } from "@/shared/types/cart";
import { useCart } from "@/features/cart/hooks/useCart";
import { formatPrice } from "@/shared/lib/formatPrice";

// Validation schema for checkout form
const checkoutFormSchema = z.object({
  fullName: z.string().min(1, { message: "Nama lengkap wajib diisi." }),
  street: z.string().min(1, {
    message: "Alamat lengkap (jalan, nomor rumah, RT/RW) wajib diisi.",
  }),
  city: z.string().min(1, { message: "Kota/Kabupaten wajib diisi." }),
  province: z.string().min(1, { message: "Provinsi wajib diisi." }),
  postalCode: z.string().min(1, { message: "Kode pos wajib diisi." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Nomor telepon tidak valid (min. 10 digit)." })
    .max(15, { message: "Nomor telepon tidak valid (max. 15 digit)." }),
  email: z
    .string()
    .email({ message: "Format email tidak valid." })
    .min(1, { message: "Email wajib diisi." }),
  notes: z.string().optional().nullable(),
});

type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

interface ShippingAddressRequest {
  fullName: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
}

interface UseCheckoutProps {
  cartItems: CartItem[];
}

export interface UseCheckoutReturn {
  isLoadingCreateOrder: boolean;
  submitOrderError: string | null;
  formCheckout: ReturnType<typeof useForm<CheckoutFormData>>;
  onSubmitCheckout: (values: CheckoutFormData) => Promise<void>;
  formatPrice: (price: number) => string;
}

export const useCheckout = ({ cartItems }: UseCheckoutProps): UseCheckoutReturn => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  const isLoadingCreateOrder = useSelector(selectIsLoadingCreateOrder);
  const submitOrderError = useSelector(selectSubmitOrderError);
  const { user } = useSelector(selectUserAuthStatus);
  const { getCart } = useCart();

  // Initialize form with react-hook-form and zodResolver
  const formCheckout = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      street: "",
      city: "",
      province: "",
      postalCode: "",
      phoneNumber: "",
      email: "",
      notes: null,
    },
  });

  const onSubmitCheckout = useCallback(async (values: CheckoutFormData) => {
    // Validation for userId
    if (!user?._id || cartItems.length === 0) {
      router.push("/auth/login");
      toast.error("Silahkan login terlebih dahulu.");
      return;
    }

    try {
      // Prepare shipping address object
      const shippingAddress: ShippingAddressRequest = {
        fullName: values.fullName,
        street: values.street,
        city: values.city,
        province: values.province,
        postalCode: values.postalCode,
        phoneNumber: values.phoneNumber,
        email: values.email,
      };

      const paymentMethod = "Bank Transfer (Simulasi)";

      const response = await dispatch(
        createOrderAsync({
          userId: user._id,
          shippingAddress,
          paymentMethod,
          notes: values.notes || "",
        })
      ).unwrap();

      toast.success(
        "Pesanan berhasil dibuat!, silahkan lakukan pembayaran Anda."
      );
      
      await getCart();
      router.push(`/order/${response.order.orderId}`);
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Gagal membuat pesanan. Mohon coba lagi.");
    }
  }, [cartItems, user, dispatch, getCart, router]);

  return {
    isLoadingCreateOrder,
    submitOrderError,
    formCheckout,
    onSubmitCheckout,
    formatPrice,
  };
};

interface UseOrderPaymentProps {
  orderId: string;
}

export interface UseOrderPaymentReturn {
  handlePayOrder: () => Promise<void>;
  loadingPayOrder: boolean;
}

export const useOrderPayment = ({ orderId }: UseOrderPaymentProps): UseOrderPaymentReturn => {
  const [loadingPayOrder, setLoadingPayOrder] = useState<boolean>(false);
  const router = useRouter();

  const handlePayOrder = useCallback(async () => {
    if (loadingPayOrder) return;
    
    setLoadingPayOrder(true);
    
    try {
      // TODO: Implement payment use case
      // const response = await payOrderUseCase.execute({ orderId });
      
      // Mock implementation for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.refresh();
      toast.success("Pesanan Anda telah berhasil melakukan pembayaran");
    } catch (error) {
      toast.error("Gagal melakukan pembayaran. Mohon coba lagi");
    } finally {
      setLoadingPayOrder(false);
    }
  }, [loadingPayOrder, orderId, router]);

  return {
    handlePayOrder,
    loadingPayOrder,
  };
};