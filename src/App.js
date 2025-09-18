import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import DashboardPage from './pages/DashboardPage';
import SignInPage from './pages/SignInPage';
import MainPage from './pages/MainPage';

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
          element={user ? <Navigate to="/main" replace /> : <SignInPage />} 
        />
        <Route 
          path="/main" 
          element={user ? <MainPage/> : <Navigate to="/" replace />} 
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