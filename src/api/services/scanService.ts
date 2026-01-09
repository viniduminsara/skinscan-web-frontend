import client from "../client";
import { ApiResponse } from "../types/common";
import { Scan } from "../types/scan";

export const getScans = () => client.get<ApiResponse<Scan[]>>("/scans");

export const getScanById = (id: string) => client.get<ApiResponse<Scan>>(`/scans/${id}`);

export const createScan = (formData: FormData) => client.post<ApiResponse<Scan>>("/scans/web", formData);
