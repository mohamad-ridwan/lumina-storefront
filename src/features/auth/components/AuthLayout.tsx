import { AuthLayoutWrapper } from "./AuthLayoutWrapper";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ ...props }: AuthLayoutProps) {
  return <AuthLayoutWrapper {...props} />;
}