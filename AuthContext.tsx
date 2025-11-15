import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, onAuthStateChanged } from './firebase';
import type { User } from 'firebase/auth';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    googleAccessToken: string | null;
    setGoogleAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({ 
    currentUser: null, 
    loading: true,
    googleAccessToken: null,
    setGoogleAccessToken: () => {}
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            if (!user) {
                setGoogleAccessToken(null); // Clear token on logout
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        loading,
        googleAccessToken,
        setGoogleAccessToken
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
