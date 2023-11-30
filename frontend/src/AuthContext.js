import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const storedToken = localStorage.getItem('authToken');
        return !!storedToken
    });

    const [userData, setuserData] = useState(() => {
        const storedUser = localStorage.getItem('userData');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        // No additional initialization logic for now
    }, []);

    const login = (data) => {
        setIsLoggedIn(true);
        setuserData(data);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data));
        console.log('Authentication Token:', data.token);
    }
    const logout = () => {
        setIsLoggedIn(false);
        setuserData(null);
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
