import {
  removeClientSessionCookie,
  setClientSessionCookie,
} from "@/shared/lib/cookies";
import { AppDispatch } from "@/core/infrastructure/services";
import { resetCart } from "@/core/infrastructure/services/cart/cartSlice";
import { resetActiveProductImg } from "@/core/infrastructure/services/product/productSlice";
import { loginAsync } from "@/core/infrastructure/services/user/userAction";
import { logout } from "@/core/infrastructure/services/user/userSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  useEffect(() => {
    dispatch(resetCart());
    dispatch(logout());
    dispatch(resetActiveProductImg());
    removeClientSessionCookie();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.phoneNumber) {
      toast.error("Semua field harus diisi");
      return;
    }

    setIsLoading(true);

    try {
      const result = await dispatch(loginAsync(formData)).unwrap();

      // Save token to cookie
      setClientSessionCookie(result.token);

      toast.success("Login berhasil!");
      router.push(redirectTo);
    } catch (error: unknown) {
      toast.error((error as Error)?.message || "Login gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleChange,
    handleSubmit,
    formData,
  };
};
