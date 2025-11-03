"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CustomBreadcrumb from "@/shared/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/shared/components/ContainerPage";
import CartContent from "@/features/cart/components/CartContent";
import { AppDispatch } from "@/core/infrastructure/services";
import { setUserFromCookie } from "@/core/infrastructure/services/user/userSlice";
import { useReduxCart } from "@/core/usecases/cart/useCart";
import { User } from "@/core/domain/user";

interface CartPageClientProps {
  user: User;
  token: string;
}

export default function CartPageClient({ user, token }: CartPageClientProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { getCart } = useReduxCart();

  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    { href: "/cart", label: "Cart", isCurrent: true },
  ];

  // Set user data in Redux store and fetch cart
  useEffect(() => {
    dispatch(setUserFromCookie({ user, token }));
    getCart(user._id);
  }, [dispatch, user, token, getCart]);

  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />
      <div className="mt-6">
        <CartContent />
      </div>
    </ContainerPage>
  );
}
