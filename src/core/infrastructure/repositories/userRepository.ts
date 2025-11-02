/**
 * @fileoverview User Repository
 * Infrastructure layer for user data access
 */

import { User, AuthenticationResult, LoginCredentials, RegistrationData } from '@/core/domain/user';
import { httpClient } from '../services/httpClient';

export interface UserRepository {
  authenticate(credentials: LoginCredentials): Promise<AuthenticationResult>;
  register(data: RegistrationData): Promise<AuthenticationResult>;
  getProfile(userId: string): Promise<User>;
  updateProfile(userId: string, data: Partial<User>): Promise<User>;
}

interface ApiAuthResponse {
  message: string;
  data: any; // Will be mapped to User
  token: string;
}

interface ApiUserResponse {
  success: boolean;
  message: string;
  data: any; // Will be mapped to User
}

class HttpUserRepository implements UserRepository {
  async authenticate(credentials: LoginCredentials): Promise<AuthenticationResult> {
    const response = await httpClient.post<ApiAuthResponse>('/api/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });

    return {
      user: this.mapToUser(response.data.data),
      token: { value: response.data.token },
      message: response.data.message,
    };
  }

  async register(data: RegistrationData): Promise<AuthenticationResult> {
    const response = await httpClient.post<ApiAuthResponse>('/api/auth/register', {
      username: data.username,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
    });

    return {
      user: this.mapToUser(response.data.data),
      token: { value: response.data.token },
      message: response.data.message,
    };
  }

  async getProfile(userId: string): Promise<User> {
    const response = await httpClient.get<ApiUserResponse>(`/api/users/profile/${userId}`);
    return this.mapToUser(response.data.data);
  }

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    const response = await httpClient.put<ApiUserResponse>(`/api/users/profile/${userId}`, data);
    return this.mapToUser(response.data.data);
  }

  private mapToUser(data: any): User {
    return {
      _id: data._id,
      verification: data.verification,
      username: data.username,
      email: data.email,
      image: data.image,
      id: data.id,
      phoneNumber: data.phoneNumber,
      __v: data.__v,
      lastSeenTime: data.lastSeenTime,
      imgCropped: data.imgCropped,
      thumbnail: data.thumbnail,
      role: data.role,
    };
  }
}

export const userRepository = new HttpUserRepository();