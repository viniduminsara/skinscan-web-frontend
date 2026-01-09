import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../sidebar';
import { Button } from '../ui-elements/button';
import { Card, CardContent } from '../ui-elements/card';
import { Camera, Upload, Shield, Info, BookOpen } from 'lucide-react';
import * as ScanService from '../../api/services/scanService';

interface ScanPageProps {
  onSignOut: () => void;
}

export function ScanPage({ onSignOut }: ScanPageProps) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleAnalyze = async () => {
    if (selectedImage) {
      setIsProcessing(true);
      const formData = new FormData();
      formData.append('image', selectedImage);
      try {
        const res = await ScanService.createScan(formData);

        if (res.data.success) {
          setIsProcessing(false);
          navigate(`/result/${res.data.body.id}`);
        }
      } catch { }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onSignOut={onSignOut} />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl text-gray-900 mb-2">Scan Your Skin</h1>
            <p className="text-gray-600">Upload or capture an image for AI analysis</p>
          </div>

          {/* Privacy Info Banner */}
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">Medical Disclaimer</h3>
                  <p className="text-sm text-gray-600">
                    This AI analysis is for informational purposes only and does not constitute medical advice.
                    Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Options */}
          {!selectedImage ? (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="hover:shadow-lg transition cursor-pointer border-2 border-dashed">
                <CardContent className="p-12 text-center">
                  <label htmlFor="camera-input" className="cursor-pointer">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl text-gray-900 mb-2">Take Photo</h3>
                    <p className="text-gray-600">Use your camera to capture an image</p>
                    <input
                      id="camera-input"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition cursor-pointer border-2 border-dashed">
                <CardContent className="p-12 text-center">
                  <label htmlFor="file-input" className="cursor-pointer">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl text-gray-900 mb-2">Upload Image</h3>
                    <p className="text-gray-600">Choose from your device</p>
                    <input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Image Preview */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg text-gray-900 mb-4">Image Preview</h3>
                  <div className="relative max-w-2xl mx-auto">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected skin area"
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => setSelectedImage(null)}
                  disabled={isProcessing}
                >
                  Choose Different Image
                </Button>
                <Button
                  onClick={handleAnalyze}
                  disabled={isProcessing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5 mr-2" />
                      Analyze with AI
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Info Section */}
          <Card className="mt-8 bg-gray-50">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-gray-900 mb-2">Tips for Best Results</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Ensure good lighting when taking the photo</li>
                    <li>• Keep the camera steady and focus on the skin area</li>
                    <li>• Include the entire area of concern in the frame</li>
                    <li>• Avoid using flash if possible</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
