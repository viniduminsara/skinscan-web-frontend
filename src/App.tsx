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
import { useAppDispatch } from './store/hooks';
import { signIn, signOut } from './store/slices/authSlice';
import { setUserInfo, clearUserInfo } from './store/slices/userSlice';
import { User } from './api/types/auth';
import { ACCESS_TOKEN_KEY } from './api/client';
import { Layout } from './components/layout';
import { ProtectedRoute } from './components/protected-route';

export default function App() {
  const dispatch = useAppDispatch();

  const handleSignIn = (userData: User, token: string) => {
    dispatch(setUserInfo({ id: userData.id, username: userData.username, email: userData.email }));
    dispatch(signIn(userData.id));
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(clearUserInfo());
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage onSignUp={handleSignIn} />} />
          <Route path="/signin" element={<SignInPage onSignIn={handleSignIn} />} />
          <Route element={<Layout onSignOut={handleSignOut} />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/scan" element={<ScanPage/>}/>
              <Route path="/result/:id" element={<ResultsPage/>}/>
              <Route path="/history" element={<HistoryPage/>}/>
              <Route path="/profile" element={<ProfilePage onSignOut={handleSignOut}/>}/>
            </Route>
          </Route>
        </Routes>
      </Router>
      <Toaster richColors position="top-right" />
    </>
  );
}
