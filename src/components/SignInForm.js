import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function SignInForm() {
    const { signIn } = useAuth();
    const [formData, setFormData] = useState({
      role: 'admin',
      email: '',
      password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
    const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const { data, error } = await signIn(formData.email, formData.password, "admin");
          
            if (error) {
                setError(error.message);
            } else {
                // Success - user will be redirected by AuthContext
                console.log('Sign in successful:', data);
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
      };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Email Field */}
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 bg-gray-100 rounded-lg sm:rounded-xl text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
                    required
                />
            </div>

            {/* Password Field */}
            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 bg-gray-100 rounded-lg sm:rounded-xl text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
                    required
                />
            </div>

            {/* Sign In Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-800 text-white py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-medium hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Signing In...' : 'Sign In'}
            </button>
        </form>
    );
}

export default SignInForm;