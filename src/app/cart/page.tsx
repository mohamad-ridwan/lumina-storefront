"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/container/ContainerPage";
import CartContent from "@/sections/cart/CartContent";
import { selectUserAuthStatus } from "@/store/selectors";
import { useReduxCart } from "@/hooks/useCart";

const CartPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, hasValidSession } = useSelector(selectUserAuthStatus);
  const { getCart } = useReduxCart();

  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    { href: "/cart", label: "Cart", isCurrent: true },
  ];

  // Check authentication and redirect if needed
  useEffect(() => {
    if (!isAuthenticated || !hasValidSession || !user?._id) {
      // Redirect to login with cart as return destination
      router.push('/auth/login?redirect=/cart');
      return;
    }

    // Fetch cart data if user is authenticated
    getCart(user._id);
  }, [isAuthenticated, hasValidSession, user?._id, getCart, router]);

  // Show loading or redirect message while checking authentication
  if (!isAuthenticated || !hasValidSession || !user?._id) {
    return (
      <ContainerPage>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Redirecting to login...</h1>
            <p className="text-muted-foreground">Please wait while we redirect you to the login page.</p>
          </div>
        </div>
      </ContainerPage>
    );
  }

  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
      <div className="mt-6">
        <CartContent />
      </div>
    </ContainerPage>
  );
};

export default CartPage;
