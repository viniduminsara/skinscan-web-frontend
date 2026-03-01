import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Sidebar } from '../sidebar';
import { Button } from '../ui-elements/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui-elements/card';
import { Badge } from '../ui-elements/badge';
import { AlertCircle, Save, Camera, Eye, EyeOff, BookOpen, Check, ShieldCheck, Trash2 } from 'lucide-react';
import { Scan } from '../../api/types/scan';
import * as ScanService from '../../api/services/scanService';
import { formatPredictionResult } from '../../utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui-elements/alert-dialog';
import { toast } from 'sonner';

export function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [scanData, setScanData] = useState<Scan>();

  const resultId = location.pathname.split('/').pop();

  // Normalize riskStatus so '0' or 0 both work and we can explicit-check for -1
  const riskStatusRaw = scanData?.result.riskStatus;
  const riskStatusNum = typeof riskStatusRaw === 'string' || typeof riskStatusRaw === 'number'
    ? Number(riskStatusRaw)
    : null;

  const fetchScanById = async () => {
    if (!resultId) {
      navigate('/history');
      return;
    }

    try {
      const res = await ScanService.getScanById(resultId!);

      if (res.data.success) {
        setScanData(res.data.body);
      }
    } catch { }
  }

  const handleDeleteScan = async () => {
    if (!resultId) return;

    try {
      const res = await ScanService.deleteScanById(resultId);

      if (res.data.success) {
        toast.success('Scan deleted successfully');
        navigate('/history');
      }
    } catch { }
  }

  useEffect(() => {
    fetchScanById();
  }, [resultId]);

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Analysis Results</h1>
          <p className="text-gray-600">AI-powered skin analysis complete</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Preview */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Scanned Image</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHeatmap(!showHeatmap)}
                  >
                    {showHeatmap ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Hide Heatmap
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Show Heatmap
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={showHeatmap ? scanData?.result.heatmap : scanData?.imageString}
                    alt="Scan result"
                    className="w-full"
                  />
                  {showHeatmap && (
                    <div className="absolute inset-0 bg-gradient-radial from-red-500/40 via-orange-500/30 to-transparent"></div>
                  )}
                </div>
                {showHeatmap && (
                  <p className="text-sm text-gray-600 mt-3">
                    Red areas indicate regions of higher concern detected by the AI model
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Link to="/scan" className="flex-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Camera className="w-4 h-4 mr-2" />
                  Scan Again
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild className="flex-1">
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Scan
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your scan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteScan} className="bg-red-600 hover:bg-red-700">
                      Yes, Delete Scan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* Results Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detection Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    {scanData?.result.prediction === 'Unknown_Normal' ? (
                      <ShieldCheck className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <h3 className="text-xl text-gray-900 mb-1">{formatPredictionResult(scanData?.result.prediction!)}</h3>
                      <Badge variant={scanData?.result.prediction === 'Unknown_Normal' ? 'secondary' : scanData?.result.confidence! >= 75 ? 'destructive' : 'default'}>
                        {scanData?.result.prediction === 'Unknown_Normal' ? 'No' : scanData?.result.confidence! > 75 ? 'High' : 'Low'} Risk
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Confidence Level</span>
                      <span className="text-gray-900">{scanData?.result.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${scanData?.result.confidence}%` }}
                      ></div>
                    </div>
                  </div>

                  {scanData?.result.affectedArea && scanData?.result.affectedArea !== 0 && (
                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Estimated Affected Area</span>
                        <span className="text-gray-900">{scanData?.result.affectedArea}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all"
                          style={{ width: `${scanData?.result.affectedArea}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">{result.description}</p>
                  </div> */}
              </CardContent>
            </Card>

            {riskStatusNum !== null && riskStatusNum !== -1 && (() => {
              const status = riskStatusNum;
               const map: Record<number, { trend: string; message: string; bg: string; border: string; iconColor: string; Icon: any }> = {
                 0: {
                   trend: 'Improving or Stable',
                   message: 'Great news! The affected area is stable or shrinking.',
                   bg: 'bg-green-50',
                   border: 'border-green-200',
                   iconColor: 'text-green-600',
                   Icon: Check,
                 },
                 1: {
                   trend: 'Spreading',
                   message: 'Notice: The area appears to be spreading slowly.',
                   bg: 'bg-amber-50',
                   border: 'border-amber-200',
                   iconColor: 'text-amber-600',
                   Icon: AlertCircle,
                 },
                 2: {
                   trend: 'Rapid Spread',
                   message: 'Alert: The affected area has increased significantly since your last scan.',
                   bg: 'bg-red-50',
                   border: 'border-red-200',
                   iconColor: 'text-orange-600',
                   Icon: AlertCircle,
                 },
               };
 
               const info = map[status] ?? null;
               if (!info) return null;
 
               const Icon = info.Icon;
 
               return (
                 <Card className={`${info.bg} ${info.border}`}>
                   <CardContent className="p-4">
                     <div className="flex items-start gap-3">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white/40`}>
                         <Icon className={`w-5 h-5 ${info.iconColor}`} />
                       </div>
                       <div>
                         <h4 className="text-sm font-semibold text-gray-900">{info.trend}</h4>
                         <p className="text-sm text-gray-700 mt-1">{info.message}</p>
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               );
             })()}

            {scanData?.suggestions && scanData.suggestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {scanData?.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm text-blue-600">{index + 1}</span>
                        </div>
                        <p className="text-gray-700">{suggestion}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <BookOpen className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-gray-900 mb-2">Medical Disclaimer</h4>
                    <p className="text-sm text-gray-700">
                      This AI analysis is for informational purposes only and does not constitute medical advice.
                      Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
