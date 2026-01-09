import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/pages/landing-page';
import { SignUpPage } from './components/pages/sign-up-page';
import { SignInPage } from './components/pages/sign-in-page';
import { Dashboard } from './components/pages/dashboard';
import { ScanPage } from './components/pages/scan-page';
import { ResultsPage } from './components/pages/results-page';
import { HistoryPage } from './components/pages/history-page';
import { ProfilePage } from './components/pages/profile-page';
import { Toaster } from 'sonner';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { signIn, signOut } from './store/slices/authSlice';
import { setUserInfo, clearUserInfo } from './store/slices/userSlice';
import { useState } from 'react';
import { User } from './api/types/auth';
import { ACCESS_TOKEN_KEY } from './api/client';

export default function App() {
  // auth derived from redux
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userName = useAppSelector((state) => state.user.username);
  const dispatch = useAppDispatch();

  // keep scanHistory local for now (or migrate to redux later)
  const [scanHistory, setScanHistory] = useState<any[]>([]);

  const handleSignIn = (userData: User, token: string) => {
    dispatch(setUserInfo({ id: userData.id, username: userData.username, email: userData.email }));
    dispatch(signIn(userData.id));
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(clearUserInfo());
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
            path="/result/:id"
            element={
              isAuthenticated ?
                <ResultsPage onSignOut={handleSignOut}/> :
                <Navigate to="/signin" />
            }
          />
          <Route
            path="/history"
            element={
              isAuthenticated ?
                <HistoryPage onSignOut={handleSignOut} /> :
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
