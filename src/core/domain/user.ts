/**
 * @fileoverview User Domain Entities
 * Core domain models for user management and authentication
 */

/**
 * User aggregate root
 */
export interface User {
  readonly _id: string;
  readonly verification: boolean;
  readonly username: string;
  readonly email: string;
  readonly image: string;
  readonly id: string;
  readonly phoneNumber: string;
  readonly __v: number;
  readonly lastSeenTime: string;
  readonly imgCropped: string;
  readonly thumbnail: string;
  readonly role: string;
}

/**
 * Authentication token value object
 */
export interface AuthToken {
  readonly value: string;
  readonly expiresAt?: string;
}

/**
 * Login credentials value object
 */
export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
}

/**
 * Registration data value object
 */
export interface RegistrationData {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly phoneNumber: string;
}

/**
 * Authentication result
 */
export interface AuthenticationResult {
  readonly user: User;
  readonly token: AuthToken;
  readonly message: string;
}

/**
 * User session state
 */
export interface UserSession {
  readonly user: User | null;
  readonly token: AuthToken | null;
  readonly isAuthenticated: boolean;
}