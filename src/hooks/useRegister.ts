import { useState } from "react";
import { toast } from "sonner";

export const useRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber
    ) {
      toast.error("Semua field harus diisi");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement register API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay

      toast.success("Registrasi berhasil! Silakan login.");
      // TODO: Redirect to login or auto-login
    } catch (error: unknown) {
      toast.error((error as Error)?.message || "Registrasi gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
  };
};
