import client from "../client";
import { LoginRequest, LoginResponse, SignUpRequest } from "../types/auth";
import { ApiResponse } from "../types/common";

export const signIn = (data: LoginRequest) => client.post<ApiResponse<LoginResponse>>("/users/signin", data);

export const signUp = (data: SignUpRequest) => client.post<ApiResponse<LoginResponse>>("/users/signup", data);