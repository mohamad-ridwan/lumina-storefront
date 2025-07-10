/**
 * @fileoverview Type Definitions for User Data and Login Response.
 * These interfaces define the structure for user profile information
 * and the complete API response upon successful login.
 */

/**
 * Interface for the user's profile data.
 * This includes personal details, authentication status, and roles.
 */
export interface User {
  _id: string;
  verification: boolean;
  username: string;
  email: string;
  password?: string; // Password might be sensitive and not always returned, or hashed. Making it optional.
  image: string; // URL to the user's profile image
  id: string; // A unique identifier for the user
  phoneNumber: string;
  __v: number; // Version key, common in Mongoose/MongoDB
  lastSeenTime: string; // Timestamp in string format
  imgCropped: string; // URL to the cropped image
  thumbnail: string; // Base64 encoded thumbnail image
  role: string; // User's role (e.g., "admin", "user")
}

/**
 * Interface for the complete API response after a successful user login.
 * It contains a message, the user data, and an authentication token.
 */
export interface LoginResponse {
  message: string;
  data: User; // The user data conforming to the User interface
  token: string; // The authentication token
}
