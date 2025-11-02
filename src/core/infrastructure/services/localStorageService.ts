/**
 * @fileoverview Local Storage Service
 * Infrastructure service for browser local storage operations
 */

export interface StorageService {
  getItem<T>(key: string): T | null;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
  clear(): void;
  hasItem(key: string): boolean;
}

class BrowserLocalStorageService implements StorageService {
  private isClient(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getItem<T>(key: string): T | null {
    if (!this.isClient()) {
      return null;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item from localStorage: ${key}`, error);
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    if (!this.isClient()) {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item in localStorage: ${key}`, error);
    }
  }

  removeItem(key: string): void {
    if (!this.isClient()) {
      return;
    }

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from localStorage: ${key}`, error);
    }
  }

  clear(): void {
    if (!this.isClient()) {
      return;
    }

    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }

  hasItem(key: string): boolean {
    if (!this.isClient()) {
      return false;
    }

    return localStorage.getItem(key) !== null;
  }
}

// Default local storage service instance
export const localStorageService = new BrowserLocalStorageService();

export { BrowserLocalStorageService };