import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../sidebar';
import { Button } from '../ui-elements/button';
import { Card, CardContent } from '../ui-elements/card';
import { Badge } from '../ui-elements/badge';
import { Calendar, Eye, TrendingUp, Grid, List } from 'lucide-react';
import * as ScanService from '../../api/services/scanService';
import { Scan } from '../../api/types/scan';
import { formatPredictionResult } from '../../utils';

export function HistoryPage() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const formatDate = (dateInput: string | Date) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const fetchScanHistory = async () => {
    try {
      const res = await ScanService.getScans();

      if (res.data.success) {
        setScans(res.data.body);
      }
    } catch { }
  }

  useEffect(() => {
    fetchScanHistory();
  }, []);

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">Scan History</h1>
            <p className="text-gray-600">Track and compare your skin scans over time</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {scans.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">No scans yet</h3>
              <p className="text-gray-600 mb-6">Start your first skin scan to see your history here</p>
              <Link to="/scan">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Start New Scan
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scans.filter((scan) => scan.device === 'WEB').map((scan) => (
                  <Card key={scan.id} className="overflow-hidden hover:shadow-lg transition">
                    <div className="aspect-square bg-gray-200">
                      <img
                        src={scan.imageString}
                        alt={scan.result.prediction}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-gray-900">{formatPredictionResult(scan.result.prediction!)}</h3>
                        <Badge
                          variant={
                            scan.result.prediction === 'Unknown_Normal' ? 'default' : scan.result.confidence >= 75 ? 'destructive' : 'secondary'
                          }
                        >
                          {scan.result.prediction === 'Unknown_Normal' ? 'Non' : scan.result.confidence >= 75 ? 'High' : 'Low'}
                        </Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Confidence</span>
                          <span className="text-gray-900">{scan.result.confidence}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${scan.result.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{formatDate(scan.date)}</span>
                        <Link to={`/result/${scan.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left p-4 text-sm text-gray-600">Preview</th>
                          <th className="text-left p-4 text-sm text-gray-600">Prediction</th>
                          <th className="text-left p-4 text-sm text-gray-600">Risk Level</th>
                          <th className="text-left p-4 text-sm text-gray-600">Confidence</th>
                          <th className="text-left p-4 text-sm text-gray-600">Date</th>
                          <th className="text-left p-4 text-sm text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scans.filter((scan) => scan.device === 'WEB').map((scan, index) => (
                          <tr key={scan.id} className={index !== scans.length - 1 ? 'border-b' : ''}>
                            <td className="p-4">
                              <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
                                <img
                                  src={scan.imageString}
                                  alt={scan.result.prediction}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </td>
                            <td className="p-4 text-gray-900">{formatPredictionResult(scan.result.prediction!)}</td>
                            <td className="p-4">
                              <Badge
                                variant={
                                  scan.result.prediction === 'Unknown_Normal' ? 'default' : scan.result.confidence >= 75 ? 'destructive' : 'secondary'
                                }
                              >
                                {scan.result.prediction === 'Unknown_Normal' ? 'Non' : scan.result.confidence >= 75 ? 'High' : 'Low'}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${scan.result.confidence}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-900">{scan.result.confidence}%</span>
                              </div>
                            </td>
                            <td className="p-4 text-sm text-gray-600">{formatDate(scan.date)}</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Link to={`/result/${scan.id}`}>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4 mr-1" />
                                    View Details
                                  </Button>
                                </Link>
                                {/* <Button variant="ghost" size="sm">
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    Compare
                                  </Button> */}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
