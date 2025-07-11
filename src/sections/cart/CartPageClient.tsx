"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/container/ContainerPage";
import CartContent from "@/sections/cart/CartContent";
import { AppDispatch } from "@/store";
import { setUserFromCookie } from "@/store/user/userSlice";
import { useReduxCart } from "@/hooks/useCart";
import { User } from "@/types/user";

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
