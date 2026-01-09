
export interface Scan {
    id: string;
    date: Date;
    imageString: string;
    result: ScanResult;
    device: 'WEB' | 'MOBILE';
}

export interface ScanResult {
    prediction: string;
    confidence: number;
    heatmap: string;
}
