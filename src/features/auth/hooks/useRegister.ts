/**
 * @fileoverview Register Hook
 * Authentication feature hook for user registration
 */

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RegistrationData } from "@/shared/types/user";

interface RegisterFormData extends RegistrationData {
  confirmPassword: string;
}

export interface UseRegisterReturn {
  formData: RegisterFormData;
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export const useRegister = (): UseRegisterReturn => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

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
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber
    ) {
      toast.error("Semua field harus diisi");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Format email tidak valid");
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok");
      return;
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
      toast.error("Format nomor telepon tidak valid");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement register API call using use case
      // const result = await registerUseCase.execute({
      //   username: formData.username,
      //   email: formData.email,
      //   password: formData.password,
      //   phoneNumber: formData.phoneNumber,
      // });

      // Mock implementation for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Registrasi berhasil! Silakan login.");
      router.push("/auth/login");
    } catch (error: unknown) {
      toast.error((error as Error)?.message || "Registrasi gagal");
    } finally {
      setIsLoading(false);
    }
  }, [formData, router]);

  const resetForm = useCallback(() => {
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    });
  }, []);

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    resetForm,
  };
};