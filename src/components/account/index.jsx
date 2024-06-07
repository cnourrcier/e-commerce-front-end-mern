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
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleUpdate(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`http://localhost:5000/api/account/update`, {
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

            const res = await fetch(`http://localhost:5000/api/account/delete`, {
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
            <h1>Update Account</h1>
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
                <button className='submit-button' type='submit'>Update Account</button>
            </form>
            <div className='non-submit-button-container'>
                <Button onClick={handleDeleteAccount} buttonText={'Delete Account'} />
                <Button onClick={() => navigate('/profile')} buttonText={'Return to Profile'} />
            </div>
        </div>
    )
}