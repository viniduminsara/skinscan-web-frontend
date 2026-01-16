import { ScanResult } from "./scan";

type MonthlyCount = { month: string; count: number };

export interface DashboardData {
    totalScans: number;
    thisMonthScans: number;
    lastScan: { date: Date; prediction: ScanResult } | null;
    monthlyCounts: MonthlyCount[];
}