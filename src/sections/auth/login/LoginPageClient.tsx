"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import Link from "next/link";
import { AppDispatch } from "@/store";
import { loginAsync } from "@/store/user/userSlice";
import { setClientSessionCookie } from "@/lib/cookies";
import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

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

  return (
    <AuthLayout 
      title="Masuk ke Akun Anda" 
      subtitle="Masukkan detail akun Anda untuk melanjutkan"
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

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Sedang masuk..." : "Masuk"}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">Belum punya akun? </span>
          <Link 
            href="/auth/register" 
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Daftar sekarang
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export default function LoginPageClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}