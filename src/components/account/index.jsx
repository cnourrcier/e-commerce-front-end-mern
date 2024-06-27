import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import './styles.css';

export default function Account() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    async function handleUpdate(e) {
        e.preventDefault();

        if (email && !validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`/api/account/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password, confirmPassword, address }),
                credentials: 'include'
            });
            const data = await res.json();

            if (data.success) {
                setUser(data.user);
                setMessage(data.message);
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
            setAddress('');
            setPassword('');
            setConfirmPassword('');
        }
    };

    async function handleDeleteAccount() {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`/api/account/delete`, {
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
                setMessage(data.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='account-container'>
            <h1>Update Account</h1>
            {loading && <div>Loading...</div>}
            {!loading && (
                <>
                    <form>
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
                        <label htmlFor='address'>Shipping Address</label>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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
                        <Button onClick={handleUpdate} buttonText={'Update Account'} />
                    </form>
                    <div className='non-submit-button-container'>
                        <Button onClick={handleDeleteAccount} buttonText={'Delete Account'} />
                        <Button onClick={() => navigate('/profile')} buttonText={'Return to Profile'} />
                    </div>
                    {error && <div className='error-message'>{error}</div>}
                    {message && <div>{message}</div>}
                </>
            )}
        </div>
    )
}