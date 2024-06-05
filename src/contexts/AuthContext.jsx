import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data to check if the user is authenticated
    const checkAuthStatus = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/auth-status`, {
                credentials: 'include' // Include credentials in the request 
            });
            const data = await res.json();
            if (data.success) {
                setUser(data.user);
            }
        } catch (err) {
            console.error('Error checking auth status:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};