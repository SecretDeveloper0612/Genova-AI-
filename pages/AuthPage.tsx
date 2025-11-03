import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoIcon } from '../components/icons';
import { useAuth } from '../AuthContext';

const AuthPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('you@example.com');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/app/generate');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-brand-gray-dark p-6 sm:p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center space-x-2 mb-4">
                        <LogoIcon className="h-8 w-8 text-brand-yellow" />
                        <h1 className="text-2xl font-bold">Welcome Back</h1>
                    </div>
                    <p className="text-brand-text">Welcome to Nano Banana Studio — where creativity meets AI.</p>
                </div>
                <form onSubmit={handleSignIn} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-brand-text">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-brand-gray p-3 rounded-lg border border-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                            required
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-semibold text-brand-text">Password</label>
                            <a href="#" className="text-sm text-blue-400 hover:underline">Forgot Password?</a>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-brand-gray p-3 rounded-lg border border-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                </form>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-brand-gray-light"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-brand-gray-dark px-2 text-brand-text">OR</span>
                    </div>
                </div>
                <div>
                    <button className="w-full flex items-center justify-center bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.447-2.756 4.316-5.174 5.238l6.19 5.238C41.332 35.748 44 30.138 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
                        Sign in with Google
                    </button>
                </div>
                <p className="mt-8 text-center text-sm text-brand-text">
                    Don't have an account? <a href="#" className="font-semibold text-blue-400 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
