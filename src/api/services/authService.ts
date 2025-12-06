import client from "../client";
import { LoginRequest, LoginResponse } from "../types/auth";
import { ApiResponse } from "../types/common";

export const signIn = (data: LoginRequest) => client.post<ApiResponse<LoginResponse>>("/users/signin", data);