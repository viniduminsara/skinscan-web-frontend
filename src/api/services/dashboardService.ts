import client from "../client";
import { ApiResponse } from "../types/common";
import { DashboardData } from "../types/dashboard";

export const getDashboardData = () => client.get<ApiResponse<DashboardData>>("/dashboard");