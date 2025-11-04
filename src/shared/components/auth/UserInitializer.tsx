"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setUserFromCookie } from "@/store/user/userSlice";
import { getUserProfileAsync } from "@/store/user/userAction";
import { userRepositoryImpl } from "@/core/infrastructure/repositories/impl/user";

const { getUserSession } = userRepositoryImpl;

const UserInitializer = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Check for existing session cookie and initialize user data
    const initializeUser = async () => {
      try {
        const token = getUserSession();

        if (token) {
          // Get user profile using the token
          const user = await dispatch(getUserProfileAsync(token)).unwrap();

          // Set user data in store
          dispatch(setUserFromCookie({ user, token }));
        }
      } catch (error) {
        // console.error("Error initializing user:", error);
        return error;
        // If token is invalid, we can just ignore and user will need to login
      }
    };

    initializeUser();
  }, [dispatch]);

  // This component doesn't render anything
  return null;
};

export default UserInitializer;
