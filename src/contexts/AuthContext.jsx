import { createContext, useEffect, useState } from "react";

// Create a context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to hold the authenticated user data
    const [loading, setLoading] = useState(true);

    // Fetch user data to check if the user is authenticated
    const checkAuthStatus = async () => {
        try {
            const res = await fetch(`/api/auth-status`, {
                credentials: 'include' // Ensure cookies are included in the request
            });
            const data = await res.json();

            // If the user is authenticated, set the user state
            if (data.success) {
                setUser(data.user);
            }
        } catch (err) {
            console.error('Error checking auth status:', err);
        } finally {
            setLoading(false);
        }
    };

    // Call checkAuthStatus when the component mounts
    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};