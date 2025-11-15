import React, { useState } from 'react';
import { signInWithGoogle } from './firebase';
import { useAuth } from './AuthContext';
import { GoogleIcon } from './components/icons/GoogleIcon';
import { LogoIcon } from './components/icons/LogoIcon';

const LoginPage: React.FC = () => {
    const { setGoogleAccessToken } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setError(null);
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
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg text-center">
                <div className="w-20 h-20 mx-auto">
                    <LogoIcon />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Welcome to Web to APK</h1>
                    <p className="text-slate-500 mt-2">Sign in to continue and manage your applications.</p>
                </div>
                
                {error && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-800 rounded-r-lg text-sm text-left" role="alert">
                        <p className="font-bold">Authentication Error</p>
                        <p>{error}</p>
                    </div>
                )}

                <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 rounded-lg shadow-sm text-lg font-semibold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                >
                    <GoogleIcon />
                    <span>Sign in with Google</span>
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
