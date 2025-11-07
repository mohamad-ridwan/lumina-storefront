"use client";

import Link from "next/link";
import AuthLayout from "@/features/auth/components/AuthLayout";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useRegister } from "@/hooks/useRegister";

export default function RegisterPageClient() {
  const { handleChange, handleSubmit, isLoading, formData } = useRegister();

  return (
    <AuthLayout title="Buat Akun Baru" subtitle="Daftar untuk mulai berbelanja">
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

        <Button type="submit" className="w-full" disabled={isLoading}>
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
