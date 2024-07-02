import { createContext, useEffect, useState } from "react";

// Create a context for authentication
export const AuthContext = createContext();

// AuthProvider component to provide authentication state and functions to its children
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to hold the authenticated user data
    const [loading, setLoading] = useState(true);

    // Fetch user data to check if the user is authenticated
    const checkAuthStatus = async () => {
        try {
            // Make a request to check the authentication status
            const res = await fetch(`/api/auth-status`, {
                credentials: 'include' // Ensure cookies are included in the request
            });
            const data = await res.json();

            // If the user is authenticated, update the user state
            if (data.success) {
                setUser(data.user);
            }
        } catch (err) {
            console.error('Error checking auth status:', err); // Log any errors
        } finally {
            setLoading(false); // set loading to false once the request is completed
        }
    };

    // Call checkAuthStatus when the component mounts
    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        // Provide the user state, setUser function, and loading status to the context
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};