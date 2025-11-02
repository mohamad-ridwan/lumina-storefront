/**
 * @fileoverview Login Hook
 * Authentication feature hook for user login
 */

import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AppDispatch } from "@/store";
import { resetCart } from "@/store/cart/cartSlice";
import { resetActiveProductImg } from "@/store/product/productSlice";
import { loginAsync } from "@/store/user/userAction";
import { logout } from "@/store/user/userSlice";
import { 
  removeClientSessionCookie, 
  setClientSessionCookie 
} from "@/shared/lib/cookies";
import { LoginCredentials } from "@/shared/types/user";

interface LoginFormData extends LoginCredentials {
  phoneNumber: string;
}

export interface UseLoginReturn {
  formData: LoginFormData;
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export const useLogin = (): UseLoginReturn => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  // Clear previous session on mount
  useEffect(() => {
    dispatch(resetCart());
    dispatch(logout());
    dispatch(resetActiveProductImg());
    removeClientSessionCookie();
  }, [dispatch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password || !formData.phoneNumber) {
      toast.error("Semua field harus diisi");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Format email tidak valid");
      return;
    }

    setIsLoading(true);

    try {
      const result = await dispatch(loginAsync({
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      })).unwrap();

      // Save token to cookie
      setClientSessionCookie(result.token);

      toast.success("Login berhasil!");
      router.push(redirectTo);
    } catch (error: unknown) {
      toast.error((error as Error)?.message || "Login gagal");
    } finally {
      setIsLoading(false);
    }
  }, [formData, dispatch, router, redirectTo]);

  const resetForm = useCallback(() => {
    setFormData({
      email: "",
      password: "",
      phoneNumber: "",
    });
  }, []);

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
    resetForm,
  };
};