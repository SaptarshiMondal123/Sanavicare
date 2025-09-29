import { useState, useEffect } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for existing authentication
  useEffect(() => {
    const checkAuth = () => {
      // Check if user is already logged in (localStorage or sessionStorage)
      const authStatus = localStorage.getItem('sanavi_authenticated');
      setIsAuthenticated(authStatus === 'true');
      setIsLoading(false);
    };
    
    // Small delay to prevent flash
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle successful authentication
  const handleAuthSuccess = () => {
    localStorage.setItem('sanavi_authenticated', 'true');
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('sanavi_authenticated');
    setIsAuthenticated(false);
  };

  // Show loading briefly to prevent flash
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center text-2xl animate-pulse">
          🐧
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthLayout onAuthSuccess={handleAuthSuccess} />;
  }

  return <DashboardLayout onLogout={handleLogout} />;
};

export default Index;
