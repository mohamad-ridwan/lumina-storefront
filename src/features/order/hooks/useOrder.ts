"use client";

import { payOrder } from "@/core/usecases/order";
import { AppDispatch } from "@/store";
import { createOrderAsync } from "@/store/order/orderAction";
import {
  selectIsLoadingCreateOrder,
  selectSubmitOrderError,
  selectUserAuthStatus,
} from "@/store/selectors";
import { CartItem } from "@/types/cart";
import { ShippingAddressRequest } from "@/core/domain/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import z from "zod";
import { useReduxCart } from "@/features/cart/hooks/useCart";

const formSchema = z.object({
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

interface CheckoutClientProps {
  cartItems: CartItem[];
}

export const useReduxOrder = ({ cartItems }: CheckoutClientProps) => {
  const router = useRouter();
  const isLoadingCreateOrder = useSelector(selectIsLoadingCreateOrder);
  const submitOrderError = useSelector(selectSubmitOrderError);

  const { getCart } = useReduxCart();

  const { user } = useSelector(selectUserAuthStatus);

  const dispatch = useDispatch<AppDispatch>();

  const formCheckout = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  async function onSubmitCheckout(values: z.infer<typeof formSchema>) {
    if (!user?._id || cartItems.length === 0) {
      router.push("/auth/login");
      toast.error("Silahkan login terlebih dahulu.");
      return;
    }

    try {
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
          userId: user?._id as string,
          shippingAddress,
          paymentMethod,
          notes: values.notes || "",
        })
      ).unwrap();

      toast.success(
        "Pesanan berhasil dibuat!, silahkan lakukan pembayaran Anda."
      );
      getCart();
      router.push(`/order/${response.order.orderId}`);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return {
    isLoadingCreateOrder,
    onSubmitCheckout,
    submitOrderError,
    formCheckout,
    formatPrice,
  };
};

interface Props {
  orderId: string;
}

export const useOrder = ({ orderId }: Props) => {
  const [loadingPayOrder, setLoadingPayOrder] = useState<boolean>(false);
  const router = useRouter();

  const handlePayOrder = useCallback(async () => {
    if (loadingPayOrder) return;
    setLoadingPayOrder(true);
    const response = await payOrder({ orderId });
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












