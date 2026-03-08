
export interface Scan {
    id: string;
    date: Date;
    imageString: string;
    result: ScanResult;
    suggestions: string[];
    device: 'WEB' | 'MOBILE';
}

export interface ScanResult {
    prediction: string;
    confidence: number;
    heatmap: string;
    affectedArea: number;
    riskStatus?: number;
}
