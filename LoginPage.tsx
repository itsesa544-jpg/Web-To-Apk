import React from 'react';
import { signInWithGoogle } from './firebase';
import { useAuth } from './AuthContext';
import { GoogleIcon } from './components/icons/GoogleIcon';
import { LogoIcon } from './components/icons/LogoIcon';

const LoginPage: React.FC = () => {
    const { setGoogleAccessToken } = useAuth();

    const handleLogin = async () => {
        try {
            const { token } = await signInWithGoogle();
            if (token) {
                setGoogleAccessToken(token);
            }
        } catch (error) {
            console.error("Error signing in with Google", error);
            alert("Could not sign in with Google. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg text-center">
                <div className="w-20 h-20 mx-auto">
                    <LogoIcon />
                </div>
                <h1 className="text-3xl font-bold text-slate-800">Welcome to Web to APK</h1>
                <p className="text-slate-500">Sign in to continue and manage your applications.</p>
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