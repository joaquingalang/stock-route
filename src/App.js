import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import DashboardPage from './pages/DashboardPage';
import SignInPage from './pages/SignInPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" replace /> : <SignInPage />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <DashboardPage /> : <Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWrapper;