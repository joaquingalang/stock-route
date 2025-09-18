import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function SignInForm() {
    const { signIn } = useAuth();
    const [formData, setFormData] = useState({
      role: '',
      email: '',
      password: ''
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
    const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRoleSelect = (role) => {
        setFormData(prev => ({
            ...prev,
            role: role
        }));
        setIsDropdownOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        if (!formData.role) {
            setError('Please select a role');
            setLoading(false);
            return;
        }
    
        try {
            const { data, error } = await signIn(formData.email, formData.password, formData.role);
          
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

            {/* Role Selection Dropdown */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 bg-gray-100 rounded-lg sm:rounded-xl text-left text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
                >
                {formData.role || 'Select Role'}
                <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 sm:mt-2 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-lg">
                    <button
                        type="button"
                        onClick={() => handleRoleSelect('user')}
                        className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 text-left hover:bg-gray-100 rounded-t-lg sm:rounded-t-xl text-base sm:text-lg"
                    >
                        User
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleSelect('admin')}
                        className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 text-left hover:bg-gray-100 rounded-b-lg sm:rounded-b-xl text-base sm:text-lg"
                    >
                        Admin
                    </button>
                </div>
                )}
            </div>

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