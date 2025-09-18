import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from "../components/SignInForm";
import Background from "../components/Background";
import { useAuth } from '../contexts/AuthContext';

function SignInPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      // Redirect to dashboard or main app
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4">
      <Background />
      <div className="relative z-10 bg-white rounded-xl shadow-2xl p-8 sm:p-10 md:p-12 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 sm:mb-8 md:mb-10 text-center font-serif">Sign In</h1>
        <SignInForm />
      </div>
    </div>
  );
}

export default SignInPage;