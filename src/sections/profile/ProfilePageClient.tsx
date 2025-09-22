"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setUserFromCookie } from "@/store/user/userSlice";
import { User } from "@/types/user";

interface ProfilePageClientProps {
  user: User;
  token: string;
}

export default function ProfilePageClient({ user, token }: ProfilePageClientProps) {
  const dispatch = useDispatch<AppDispatch>();

  // Set user data in Redux store
  useEffect(() => {
    dispatch(setUserFromCookie({ user, token }));
  }, [dispatch, user, token]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile Saya</h1>
        
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Username</label>
              <p className="text-lg font-semibold">{user.username}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
              <p className="text-lg font-semibold">{user.phoneNumber}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <p className="text-lg font-semibold">
                {user.verification ? (
                  <span className="text-green-600">Verified</span>
                ) : (
                  <span className="text-yellow-600">Not Verified</span>
                )}
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Member since: {new Date(user.lastSeenTime).toLocaleDateString('id-ID')}
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Profile editing feature coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}