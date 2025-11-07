"use client";

import { Suspense } from "react";
import Link from "next/link";
import AuthLayout from "@/features/auth/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useLogin";

function LoginForm() {
  const { isLoading, handleChange, handleSubmit, formData } = useLogin();

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

        <Button type="submit" className="w-full" disabled={isLoading}>
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
