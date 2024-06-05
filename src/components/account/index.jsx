import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function Account() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleUpdate(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/account/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password, confirmPassword }),
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                setUser(data.user);
                alert(data.message);
            } else {
                setError(data.message || 'Failed to update account');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    };

    async function handleDeleteAccount() {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/account/delete`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                setUser(null);
                alert(data.message);
                navigate('/signup');
            } else {
                setError(data.message || 'Failed to delete account');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className='account-container'>
            <h2>Update Account</h2>
            <form onSubmit={handleUpdate} >
                <label htmlFor='firstName'>First Name</label>
                <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor='lastName'>Last Name</label>
                <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type='submit'>Update Account</button>
            </form>
            <button className='delete-account-button' onClick={handleDeleteAccount}>Delete Account</button>
            <button onClick={() => navigate('/profile')}>Return to Profile</button>
        </div>
    )
}