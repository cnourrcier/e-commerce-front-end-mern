import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import './styles.css';

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleResetPassword(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, confirmPassword }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage(data.message)
                setTimeout(() => {
                    navigate('/login');
                }, [1000]);
            }
            else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className='reset-password-container'>
            <form onSubmit={handleResetPassword}>
                <h1>Reset Password</h1>
                <label htmlFor="password">New Password:</label>
                <input
                    type="password"
                    name='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='New Password'
                    required
                />
                <label htmlFor="confirmPassword">New Password:</label>
                <input
                    type="password"
                    name='confirmPassword'
                    id='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confirm Password'
                    required
                />
                <button type='submit' disabled={loading}>Reset Password</button>
                {message && <div>{message}</div>}
                {error && <div>{error}</div>}
            </form>
        </div>
    );
}