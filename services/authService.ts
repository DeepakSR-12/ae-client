import axiosInstance from '@/utils/axiosInstance';
import { LoginCredentials, RegistrationData, AuthResponse } from '../types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(`${API_URL}/login`, credentials);
  return response.data;
};

export const register = async (data: RegistrationData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(`${API_URL}/register`, data);
  return response.data;
};
