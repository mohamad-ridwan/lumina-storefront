"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { selectUserAuthStatus } from "@/store/selectors";
import { toast } from "sonner";

interface CartAuthGuardProps {
  children: React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
  action: "add" | "update" | "remove";
  onSuccess?: () => void;
}

export default function CartAuthGuard({ 
  children, 
  action, 
  onSuccess 
}: CartAuthGuardProps) {
  const { isAuthenticated, hasValidSession } = useSelector(selectUserAuthStatus);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !hasValidSession) {
      let message = "";
      switch (action) {
        case "add":
          message = "Silakan login untuk menambahkan produk ke keranjang";
          break;
        case "update":
          message = "Silakan login untuk mengupdate keranjang";
          break;
        case "remove":
          message = "Silakan login untuk menghapus item dari keranjang";
          break;
        default:
          message = "Silakan login terlebih dahulu";
      }
      
      toast.error(message);
      
      // Redirect to login with current page as redirect parameter
      const currentPath = window.location.pathname + window.location.search;
      router.push(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    // If authenticated, proceed with the original action
    if (onSuccess) {
      onSuccess();
    } else if (children.props.onClick) {
      children.props.onClick(e);
    }
  };

  // Clone children and add onClick handler
  return React.cloneElement(children, {
    onClick: handleClick,
  });
}