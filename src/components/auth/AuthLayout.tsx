import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Lumina Storefront"
            width={80}
            height={80}
            className="mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-gray-600 text-center">
              {subtitle}
            </p>
          )}
        </div>
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}