import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { LandingPage } from './components/pages/landing-page';
import { SignUpPage } from './components/pages/sign-up-page';
import { SignInPage } from './components/pages/sign-in-page';
import { Dashboard } from './components/pages/dashboard';
import { ScanPage } from './components/pages/scan-page';
import { ResultsPage } from './components/pages/results-page';
import { HistoryPage } from './components/pages/history-page';
import { ProfilePage } from './components/pages/profile-page';
import { Toaster } from 'sonner';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [scanHistory, setScanHistory] = useState<any[]>([]);

  const handleSignIn = (name: string) => {
    setIsAuthenticated(true);
    setUserName(name);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserName('');
  };

  const addToHistory = (scan: any) => {
    setScanHistory(prev => [scan, ...prev]);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage onSignUp={handleSignIn} />} />
          <Route path="/signin" element={<SignInPage onSignIn={handleSignIn} />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ?
                <Dashboard userName={userName} onSignOut={handleSignOut} scanHistory={scanHistory} /> :
                <Navigate to="/signin" />
            }
          />
          <Route
            path="/scan"
            element={
              isAuthenticated ?
                <ScanPage onSignOut={handleSignOut} /> :
                <Navigate to="/signin" />
            }
          />
          <Route
            path="/results"
            element={
              isAuthenticated ?
                <ResultsPage onSignOut={handleSignOut} addToHistory={addToHistory} /> :
                <Navigate to="/signin" />
            }
          />
          <Route
            path="/history"
            element={
              isAuthenticated ?
                <HistoryPage onSignOut={handleSignOut} scanHistory={scanHistory} /> :
                <Navigate to="/signin" />
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ?
                <ProfilePage onSignOut={handleSignOut} userName={userName} /> :
                <Navigate to="/signin" />
            }
          />
        </Routes>
      </Router>
      <Toaster richColors position="top-right" />
    </>
  );
}
