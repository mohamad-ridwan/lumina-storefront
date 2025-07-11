"use client";

import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserCircle, LogOut, User, LogIn, UserPlus } from "lucide-react";
import { selectUserAuthStatus } from "@/store/selectors";
import { logout } from "@/store/user/userSlice";
import { resetCart } from "@/store/cart/cartSlice";
import { removeClientSessionCookie } from "@/lib/cookies";
import { AppDispatch } from "@/store";
import { toast } from "sonner";

interface UserDropdownProps {
  isMobile?: boolean;
}

export default function UserDropdown({ isMobile = false }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const { user, isAuthenticated } = useSelector(selectUserAuthStatus);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear user session
    dispatch(logout());
    dispatch(resetCart());
    removeClientSessionCookie();
    
    toast.success("Logout berhasil");
    setIsOpen(false);
    
    // Redirect to home page
    router.push('/');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  if (isMobile) {
    // Mobile version - render as list items
    return (
      <div className="w-full border-t border-border pt-4 mt-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {isAuthenticated ? "Akun" : "Masuk/Daftar"}
        </h3>
        
        {isAuthenticated ? (
          <div className="space-y-2">
            <div className="px-2 py-2 text-sm text-muted-foreground">
              Halo, {user?.username || 'User'}
            </div>
            <Link
              href="/profile"
              className="flex items-center space-x-2 w-full px-2 py-2 text-foreground hover:text-custom-blue hover:bg-muted rounded-md transition-colors duration-200"
              onClick={closeDropdown}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full px-2 py-2 text-foreground hover:text-red-600 hover:bg-muted rounded-md transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Link
              href="/auth/login"
              className="flex items-center space-x-2 w-full px-2 py-2 text-foreground hover:text-custom-blue hover:bg-muted rounded-md transition-colors duration-200"
              onClick={closeDropdown}
            >
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
            <Link
              href="/auth/register"
              className="flex items-center space-x-2 w-full px-2 py-2 text-foreground hover:text-custom-blue hover:bg-muted rounded-md transition-colors duration-200"
              onClick={closeDropdown}
            >
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Desktop version - render as dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleDropdown}
        className="relative"
      >
        <UserCircle className="h-5 w-5" />
        {isAuthenticated && (
          <span className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full"></span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-md shadow-lg z-50">
          <div className="py-2">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                  Halo, {user?.username || 'User'}
                </div>
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-200"
                  onClick={closeDropdown}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-red-600 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-200"
                  onClick={closeDropdown}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-200"
                  onClick={closeDropdown}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}