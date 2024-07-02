import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Button from '../button';
import './styles.css';

export default function ResetPassword() {
    const { token } = useParams(); // Retrieve the reset token from URL paramaters
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle password reset
    async function handleResetPassword(e) {
        e.preventDefault();

        // Password match validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            setLoading(true); // Set loading to true while processing
            setError(null); // Reset error state

            const res = await fetch(`/api/reset-password/${token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, confirmPassword }), // Send password data
            });

            const data = await res.json();
            if (data.success) {
                setMessage(data.message) // Set success message
                setTimeout(() => {
                    navigate('/login'); // Redirect to login after 1 second
                }, [1000]);
            }
            else {
                setError(data.message); // Set error message if request failed
            }
        } catch (err) {
            setError(err.message); // Catch and set network or other errors
        } finally {
            setLoading(false); // Reset loading state
        }
    }

    if (loading) return <div>Loading...</div> // Show loading indicator when loading is true

    return (
        <div className='reset-password-container'>
            <>
                <form>
                    <h1>Reset Password</h1>
                    <div className='reset-password-inputs-container'>
                        <div className='reset-password-input'>
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
                        </div>
                    </div>
                    <div className='reset-password-button-container'>
                        <Button onClick={handleResetPassword} buttonText={'Reset Password'} />
                    </div>
                </form>
                {error && <div className='error-message'>{error}</div>}
                {message && <div>{message}</div>}
            </>
        </div>
    );
}