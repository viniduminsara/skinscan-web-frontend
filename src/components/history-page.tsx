import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Eye, TrendingUp, Grid, List } from 'lucide-react';

interface HistoryPageProps {
  onSignOut: () => void;
  scanHistory: any[];
}

export function HistoryPage({ onSignOut, scanHistory }: HistoryPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data for demonstration if no history exists
  const mockHistory = scanHistory.length > 0 ? scanHistory : [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1601839777132-b3f4e455c369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luJTIwbWVkaWNhbCUyMGV4YW1pbmF0aW9ufGVufDF8fHx8MTc2MjY4MzUwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      prediction: 'Benign Nevus',
      date: '2025-11-08T10:30:00',
      confidence: 92,
      riskLevel: 'Low'
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1601839777132-b3f4e455c369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luJTIwbWVkaWNhbCUyMGV4YW1pbmF0aW9ufGVufDF8fHx8MTc2MjY4MzUwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      prediction: 'Possible Melanoma',
      date: '2025-11-07T14:15:00',
      confidence: 87,
      riskLevel: 'High'
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1601839777132-b3f4e455c369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luJTIwbWVkaWNhbCUyMGV4YW1pbmF0aW9ufGVufDF8fHx8MTc2MjY4MzUwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      prediction: 'Seborrheic Keratosis',
      date: '2025-11-05T09:45:00',
      confidence: 94,
      riskLevel: 'Low'
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1601839777132-b3f4e455c369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luJTIwbWVkaWNhbCUyMGV4YW1pbmF0aW9ufGVufDF8fHx8MTc2MjY4MzUwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      prediction: 'Actinic Keratosis',
      date: '2025-11-03T16:20:00',
      confidence: 89,
      riskLevel: 'Medium'
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onSignOut={onSignOut} />
      
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

          {mockHistory.length === 0 ? (
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
                  {mockHistory.map((scan) => (
                    <Card key={scan.id} className="overflow-hidden hover:shadow-lg transition">
                      <div className="aspect-square bg-gray-200">
                        <img 
                          src={scan.image} 
                          alt={scan.prediction}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-gray-900">{scan.prediction}</h3>
                          <Badge 
                            variant={
                              scan.riskLevel === 'High' ? 'destructive' : 
                              scan.riskLevel === 'Medium' ? 'default' : 
                              'secondary'
                            }
                          >
                            {scan.riskLevel}
                          </Badge>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Confidence</span>
                            <span className="text-gray-900">{scan.confidence}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${scan.confidence}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{formatDate(scan.date)}</span>
                          <Link to="/results" state={{ image: scan.image }}>
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
                          {mockHistory.map((scan, index) => (
                            <tr key={scan.id} className={index !== mockHistory.length - 1 ? 'border-b' : ''}>
                              <td className="p-4">
                                <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
                                  <img 
                                    src={scan.image} 
                                    alt={scan.prediction}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </td>
                              <td className="p-4 text-gray-900">{scan.prediction}</td>
                              <td className="p-4">
                                <Badge 
                                  variant={
                                    scan.riskLevel === 'High' ? 'destructive' : 
                                    scan.riskLevel === 'Medium' ? 'default' : 
                                    'secondary'
                                  }
                                >
                                  {scan.riskLevel}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full" 
                                      style={{ width: `${scan.confidence}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-900">{scan.confidence}%</span>
                                </div>
                              </td>
                              <td className="p-4 text-sm text-gray-600">{formatDate(scan.date)}</td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <Link to="/results" state={{ image: scan.image }}>
                                    <Button variant="outline" size="sm">
                                      <Eye className="w-4 h-4 mr-1" />
                                      View Details
                                    </Button>
                                  </Link>
                                  <Button variant="ghost" size="sm">
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    Compare
                                  </Button>
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
    </div>
  );
}
