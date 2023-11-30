import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const storedToken = localStorage.getItem('authToken');
        return !!storedToken
    });

    const login = (token) => {
        setIsLoggedIn(true);
        localStorage.setItem('authToken', token);
        console.log('Authentication Token:', token);
    }
    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('authToken');
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
