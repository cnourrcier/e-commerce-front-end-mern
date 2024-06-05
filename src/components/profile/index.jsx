import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './styles.css';

export default function Profile() {
    const navigate = useNavigate();
    const { user, setUser, loading } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    async function fetchProfile() {
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/profile`, {
                credentials: 'include', // Ensure cookies are included in the request
            });
            const data = await res.json();
            if (res.ok) {
                setProfile(data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleLogout() {
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/logout`, {
                method: 'POST',
                credentials: 'include' // Ensure cookies are included in the request
            });
            const data = await res.json();
            if (res.ok) {
                setUser(null);
                navigate('/login');
            } else {
                const data = await res.json();
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        }
    }

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
            <p>firstName: {user.firstName}</p>
            <p>lastName: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate('/account')}>Account Settings</button>
            {user.role === 'admin' && <Link to='/admin'>Admin Dashboard</Link>}
        </div>
    )
}