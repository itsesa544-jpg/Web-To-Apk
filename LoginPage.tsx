import React, { useState } from 'react';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from './firebase';
import { useAuth } from './AuthContext';
import { GoogleIcon } from './components/icons/GoogleIcon';
import { LogoIcon } from './components/icons/LogoIcon';

const LoginPage: React.FC = () => {
    const { setGoogleAccessToken } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<'signIn' | 'signUp'>('signIn');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setError(null);
        setIsLoading(true);
        try {
            const { token } = await signInWithGoogle();
            if (token) {
                setGoogleAccessToken(token);
            }
        } catch (err: any) {
            console.error("Error signing in with Google", err);
            if (err.code === 'auth/unauthorized-domain') {
                const hostname = window.location.hostname;
                setError(
                    `This domain (${hostname}) is not authorized for authentication. Please go to your Firebase project -> Authentication -> Settings -> Authorized domains and add this domain to the list.`
                );
            } else {
                setError("Could not sign in with Google. Please check the console for more details and try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if (view === 'signUp') {
                await signUpWithEmail(email, password);
            } else {
                await signInWithEmail(email, password);
            }
            // onAuthStateChanged in AuthContext will handle successful login
        } catch (err: any) {
            switch (err.code) {
                case 'auth/user-not-found':
                    setError('No account found with this email address.');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password. Please try again.');
                    break;
                case 'auth/email-already-in-use':
                    setError('This email is already registered. Please sign in.');
                    break;
                case 'auth/weak-password':
                    setError('Password is too weak. It should be at least 6 characters long.');
                    break;
                 case 'auth/invalid-email':
                    setError('Please enter a valid email address.');
                    break;
                default:
                    setError('An unexpected error occurred. Please try again.');
                    console.error("Firebase auth error:", err);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto">
                        <LogoIcon />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 mt-4">Welcome to Web to APK</h1>
                        <p className="text-slate-500 mt-2">Sign in or create an account to continue.</p>
                    </div>
                </div>

                <div className="flex border-b border-slate-200">
                    <button
                        onClick={() => { setView('signIn'); setError(null); }}
                        className={`flex-1 py-3 font-semibold text-center transition-colors focus:outline-none ${view === 'signIn' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => { setView('signUp'); setError(null); }}
                        className={`flex-1 py-3 font-semibold text-center transition-colors focus:outline-none ${view === 'signUp' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Sign Up
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete={view === 'signIn' ? 'current-password' : 'new-password'}
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            placeholder="Password"
                        />
                    </div>
                    
                    {error && (
                         <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm text-center" role="alert">
                            <p>{error}</p>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-[#4338CA] hover:bg-[#3730A3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4338CA] disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (view === 'signIn' ? 'Sign In' : 'Create Account')}
                        </button>
                    </div>
                </form>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-slate-400 text-sm">OR</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 rounded-lg shadow-sm text-md font-semibold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <GoogleIcon />
                    <span>Sign in with Google</span>
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
