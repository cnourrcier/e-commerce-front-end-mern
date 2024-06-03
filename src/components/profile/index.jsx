import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { AuthContext } from '../../contexts/AuthContext';

export default function Profile() {
    const navigate = useNavigate();
    const { user, setUser, loading } = useContext(AuthContext);
    const [error, setError] = useState(null);

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
        }
    }, [user, loading, navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='profile-container'>
            <h1>Profile</h1>
            {user &&
                <>
                    <p>firstName: {user.firstName}</p>
                    <p>lastName: {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            }
        </div>
    )
}