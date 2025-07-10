"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
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
    
    if (!formData.username || !formData.email || !formData.password || !formData.phoneNumber) {
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
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      
      toast.success("Registrasi berhasil! Silakan login.");
      // TODO: Redirect to login or auto-login
    } catch (error: unknown) {
      toast.error((error as Error)?.message || "Registrasi gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Buat Akun Baru" 
      subtitle="Daftar untuk mulai berbelanja"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1"
            placeholder="Masukkan username"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1"
            placeholder="Masukkan email"
          />
        </div>

        <div>
          <Label htmlFor="phoneNumber">Nomor Telepon</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="mt-1"
            placeholder="Masukkan nomor telepon"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1"
            placeholder="Masukkan password"
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="mt-1"
            placeholder="Konfirmasi password"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Sedang mendaftar..." : "Daftar"}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">Sudah punya akun? </span>
          <Link 
            href="/auth/login" 
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Masuk sekarang
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}