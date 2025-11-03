import React, { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import GeneratePage from './pages/GeneratePage';
import EditPage from './pages/EditPage';
import GalleryPage from './pages/GalleryPage';
import SubscriptionPage from './pages/SubscriptionPage';
import SettingsPage from './pages/SettingsPage';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import { useAuth } from './AuthContext';

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route 
        path="/app" 
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="generate" element={<GeneratePage />} />
        <Route path="edit" element={<EditPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="subscription" element={<SubscriptionPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default App;