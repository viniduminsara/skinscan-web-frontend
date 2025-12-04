import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Sidebar } from '../sidebar';
import { Button } from '../ui-elements/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui-elements/card';
import { Badge } from '../ui-elements/badge';
import { AlertCircle, Save, Camera, Eye, EyeOff, BookOpen } from 'lucide-react';

interface ResultsPageProps {
  onSignOut: () => void;
  addToHistory: (scan: any) => void;
}

export function ResultsPage({ onSignOut, addToHistory }: ResultsPageProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [saved, setSaved] = useState(false);

  const image = location.state?.image || null;

  // Mock prediction data - in real app this would come from AI model
  const result = {
    prediction: 'Possible Melanoma',
    confidence: 87,
    riskLevel: 'High',
    description: 'The AI model has detected characteristics consistent with melanoma. This is not a medical diagnosis.',
    recommendations: [
      'Consult a dermatologist immediately',
      'Document any changes in size, shape, or color',
      'Avoid sun exposure to the affected area',
      'Do not attempt self-treatment'
    ]
  };

  useEffect(() => {
    if (!image) {
      navigate('/scan');
    }
  }, [image, navigate]);

  const handleSave = () => {
    const scanData = {
      id: Date.now().toString(),
      image: image,
      prediction: result.prediction,
      confidence: result.confidence,
      date: new Date().toISOString(),
    };
    addToHistory(scanData);
    setSaved(true);
  };

  if (!image) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onSignOut={onSignOut} />

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
                      src={image}
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
                <Button
                  onClick={handleSave}
                  disabled={saved}
                  variant="outline"
                  className="flex-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saved ? 'Saved to History' : 'Save to History'}
                </Button>
                <Link to="/scan" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Scan Again
                  </Button>
                </Link>
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
                      <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl text-gray-900 mb-1">{result.prediction}</h3>
                        <Badge variant={result.riskLevel === 'High' ? 'destructive' : 'default'}>
                          {result.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Confidence Level</span>
                        <span className="text-gray-900">{result.confidence}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all"
                          style={{ width: `${result.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">{result.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm text-blue-600">{index + 1}</span>
                        </div>
                        <p className="text-gray-700">{rec}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

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
                      <a href="#" className="text-sm text-amber-700 hover:underline mt-2 inline-block">
                        Learn more about melanoma →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
