import client from "../client";
import { LoginRequest, LoginResponse, SignUpRequest, User } from "../types/auth";
import { ApiResponse } from "../types/common";

export const signIn = (data: LoginRequest) => client.post<ApiResponse<LoginResponse>>("/users/signin", data);

export const signUp = (data: SignUpRequest) => client.post<ApiResponse<LoginResponse>>("/users/signup", data);

export const getCurrentUser = () => client.get<ApiResponse<User>>("/users/profile");

export const updateUserProfile = (data: Partial<User>) => client.put<ApiResponse<User>>("/users/profile", data);

export const deleteAccount = () => client.delete<ApiResponse<null>>("/users/profile");
