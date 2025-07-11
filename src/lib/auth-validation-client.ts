"use client";

import { getUserProfile } from "@/services/api/auth/profile";
import { getClientSessionCookie, removeClientSessionCookie } from "./cookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { logout, UserState } from "@/store/user/userSlice";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { CartState, resetCart } from "@/store/cart/cartSlice";
import {
  ProductState,
  resetActiveProductImg,
} from "@/store/product/productSlice";

export async function authValidationClient(
  router: AppRouterInstance,
  dispatch: ThunkDispatch<
    {
      product: ProductState;
      cart: CartState;
      user: UserState;
    },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>
): Promise<void> {
  try {
    await getUserProfile(getClientSessionCookie() as string);
    return;
  } catch (error: unknown) {
    removeClientSessionCookie();
    dispatch(resetCart());
    dispatch(resetActiveProductImg());
    router.push("/auth/login");
    setTimeout(() => {
      dispatch(logout());
      return error;
    }, 1000);
    throw new Error(
      "Sesi tidak valid atau autentikasi gagal. Silakan login kembali."
    );
  }
}
