import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import UserMenu from './components/auth/UserMenu';
import { useAuth } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import SinglePage from './pages/SinglePage';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {user && <UserMenu user={user} />}
      <Routes>
        <Route path="/" element={<SinglePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}