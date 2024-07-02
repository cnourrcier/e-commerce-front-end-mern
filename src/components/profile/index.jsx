import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import Button from '../button';
import './styles.css';

export default function Profile() {
    const navigate = useNavigate();
    const { user, setUser, loading } = useContext(AuthContext); // Access authenticated user context
    const { updateCart } = useContext(ShoppingCartContext); // Access shopping cart context
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    // Function to fetch the user profile data
    async function fetchProfile() {
        try {
            const res = await fetch(`/api/profile`, {
                credentials: 'include', // Ensure cookies are included in the request
            });
            const data = await res.json();
            if (data.success) {
                setProfile(data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    // Function to handle user logout
    async function handleLogout() {
        try {
            const res = await fetch(`/api/logout`, {
                method: 'POST',
                credentials: 'include' // Ensure cookies are included in the request
            });
            const data = await res.json();
            if (data.success) {
                setUser(null);
                updateCart([]);
                navigate('/login');
            } else {
                const data = await res.json();
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    // Navigate to login if the user is not authenticated, and fetch profile data if authenticated
    useEffect(() => {
        if (!user && !loading) {
            navigate('/login');
        } else {
            fetchProfile();
        }
    }, [user, loading, navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='profile-container'>
            <h1>Profile</h1>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Shipping Address: {user.address}</p>
            <div className='button-container'>
                <Button onClick={handleLogout} buttonText={'Logout'} />
                <Button onClick={() => navigate('/account')} buttonText={'Account Settings'} />
                {user.role === 'admin' && <Button onClick={() => navigate('/admin')} buttonText={'Admin Dashboard'} />}
            </div>
        </div>
    )
}