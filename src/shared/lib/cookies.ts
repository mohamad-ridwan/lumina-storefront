/**
 * @fileoverview Cookie Utilities
 * Client-side cookie management utilities
 */

export const removeClientSessionCookie = () => {
  if (typeof document !== 'undefined') {
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
};

export const setClientSessionCookie = (token: string, days = 7) => {
  if (typeof document !== 'undefined') {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `session=${token}; expires=${expires.toUTCString()}; path=/`;
  }
};

export const getClientSessionCookie = (): string | null => {
  if (typeof document !== 'undefined') {
    const name = 'session=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return null;
};