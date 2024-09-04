import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import useLogout from '../../hooks/useLogout';
import Button from '../button';
import './styles.css';

export default function Profile() {
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);

    const logout = useLogout();

    // Navigate to login if the user is not authenticated
    useEffect(() => {
        if (!user && !loading) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className='profile-container'>
            <h1>Profile</h1>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Shipping Address: {user.address}</p>
            <div className='button-container'>
                <Button onClick={logout} buttonText={'Logout'} />
                <Button onClick={() => navigate('/account')} buttonText={'Account Settings'} />
                {user.role === 'admin' && <Button onClick={() => navigate('/admin')} buttonText={'Admin Dashboard'} />}
            </div>
        </div>
    )
}