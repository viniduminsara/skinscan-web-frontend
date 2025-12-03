import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Shield, Camera, BarChart, Lock, CheckCircle2, Activity } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl text-gray-900">SkinScan</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition">About</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
              <Link to="/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-6">
              <Lock className="w-4 h-4" />
              <span className="text-sm">Privacy-First Technology</span>
            </div>
            <h1 className="text-5xl text-gray-900 mb-6">
              Scan your skin.<br />Get instant AI insights.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your skin scan is processed privately on your device using federated learning.
            </p>
            <div className="flex gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
              <Link to="/signin">
                <Button size="lg" variant="outline">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1758691462848-31a39258dbd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMHNtYXJ0cGhvbmV8ZW58MXx8fHwxNzYyNjgzMzcyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Medical technology"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="about" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to AI-powered skin analysis</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Camera className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">1. Capture</h3>
              <p className="text-gray-600">
                Take a clear photo of the skin area you want to analyze using your camera or upload an existing image.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">2. AI Analyze</h3>
              <p className="text-gray-600">
                Our AI model processes the image locally on your device using advanced federated learning technology.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">3. Results</h3>
              <p className="text-gray-600">
                Receive instant insights with confidence scores and heatmaps showing areas of concern.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Badge Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-12 text-center">
            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl text-gray-900 mb-4">Privacy First – No Images Stored</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is our priority. All image processing happens on your device using federated learning. 
              We never upload or store your skin images on our servers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl text-gray-900 mb-2">Federated Learning</h3>
                <p className="text-gray-600">
                  AI models learn from your device without sending personal data to the cloud.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl text-gray-900 mb-2">Encrypted Storage</h3>
                <p className="text-gray-600">
                  Your scan history is encrypted and stored only on your device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-900">SkinScan</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 transition">Terms of Service</a>
              <a href="#" className="hover:text-gray-900 transition">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900 transition">Contact</a>
            </div>
            <p className="text-sm text-gray-500">© 2025 SkinScan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
