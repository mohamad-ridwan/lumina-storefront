const COOKIE_NAME = 'user-session-lumina-storefront';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
};

// Client-side functions (for use in client components)
export function setClientSessionCookie(token: string): void {
  document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=${COOKIE_OPTIONS.maxAge}; sameSite=${COOKIE_OPTIONS.sameSite}`;
}

export function getClientSessionCookie(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  
  const cookies = document.cookie.split(';');
  const sessionCookie = cookies.find(cookie => 
    cookie.trim().startsWith(`${COOKIE_NAME}=`)
  );
  
  return sessionCookie ? sessionCookie.split('=')[1].trim() : undefined;
}

export function removeClientSessionCookie(): void {
  document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}