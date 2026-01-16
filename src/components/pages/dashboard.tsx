import { Link } from 'react-router-dom';
import { Button } from '../ui-elements/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui-elements/card';
import { Camera, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppSelector } from '../../store/hooks';
import * as DashboardService from '../../api/services/dashboardService';
import { DashboardData } from '../../api/types/dashboard';
import { useEffect, useState } from 'react';

export function Dashboard() {
  const username = useAppSelector((state) => state.user.username);
  const [dashboardData, setDashboardData] = useState<DashboardData>();

  const fetchDashboardData = async () => {
    try {
      const res = await DashboardService.getDashboardData();

      if (res.data.success) {
        setDashboardData(res.data.body);
      }
    } catch { }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Welcome back, {username}!</h1>
          <p className="text-gray-600">Here's your skin health overview</p>
        </div>

        {/* Quick Action */}
        <div className="mb-8">
          <Link to="/scan">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Camera className="w-5 h-5 mr-2" />
              New Skin Scan
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-600">Total Scans</CardTitle>
              <Camera className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-gray-900">{dashboardData?.totalScans}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-600">This Month</CardTitle>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-gray-900">{dashboardData?.thisMonthScans}</div>
              <p className="text-xs text-green-600 mt-1">+3 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-600">Last Scan</CardTitle>
              <Calendar className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-gray-900">
                {dashboardData?.lastScan ? new Date(dashboardData.lastScan.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }) : 'No scans yet'}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {dashboardData?.lastScan ? dashboardData.lastScan.prediction.prediction : 'Start your first scan'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Last Scan Result */}
        {dashboardData?.lastScan && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Last Scan Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                  {dashboardData?.lastScan.prediction.heatmap && (
                    <img src={dashboardData.lastScan.prediction.heatmap} alt="Last scan" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <span className="text-lg text-gray-900">{dashboardData.lastScan.prediction.prediction}</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Confidence</span>
                        <span className="text-gray-900">{dashboardData.lastScan.prediction.confidence}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${dashboardData.lastScan.prediction.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Scanned on {new Date(dashboardData.lastScan.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Link to="/history">
                  <Button variant="outline">View Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Monthly Insights Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Scan Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData?.monthlyCounts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
