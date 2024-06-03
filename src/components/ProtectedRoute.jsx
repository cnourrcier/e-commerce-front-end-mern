import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>
    // Outlet allows nested routes to be rendered inside ProtectedRoute.
    return user ? <Outlet /> : <Navigate to='/login' />
};

