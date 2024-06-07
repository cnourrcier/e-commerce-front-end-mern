import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../button';
import './styles.css';

export default function Profile() {
    const navigate = useNavigate();
    const { user, setUser, loading } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    async function fetchProfile() {
        try {
            const res = await fetch(`http://localhost:5000/api/profile`, {
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
            const res = await fetch(`http://localhost:5000/api/logout`, {
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
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Email: {user.email}</p>
            <div className='button-container'>
                <Button onClick={handleLogout} buttonText={'Logout'} />
                <Button onClick={() => navigate('/account')} buttonText={'Account Settings'} />
                {user.role === 'admin' && <Button onClick={() => navigate('/admin')} buttonText={'Admin Dashboard'} />}
            </div>
        </div>
    )
}