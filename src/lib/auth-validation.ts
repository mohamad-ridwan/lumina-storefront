"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserProfile } from '@/services/api/auth/profile';
import { User } from '@/types/user';

const COOKIE_NAME = 'user-session-lumina-storefront';

export async function validateAuthFromCookie(): Promise<{ user: User; token: string } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    
    if (!token) {
      return null;
    }

    // Fetch user profile using the token
    const user = await getUserProfile(token);
    
    return { user, token };
  } catch (error) {
    console.error('Auth validation failed:', error);
    return null;
  }
}

export async function requireAuth(redirectPath?: string): Promise<{ user: User; token: string }> {
  const authResult = await validateAuthFromCookie();
  
  if (!authResult) {
    const loginUrl = redirectPath ? `/auth/login?redirect=${encodeURIComponent(redirectPath)}` : '/auth/login';
    redirect(loginUrl);
  }
  
  return authResult;
}

export async function checkAuthAndRedirectIfLoggedIn(defaultRedirect: string = '/'): Promise<void> {
  const authResult = await validateAuthFromCookie();
  
  if (authResult) {
    redirect(defaultRedirect);
  }
}