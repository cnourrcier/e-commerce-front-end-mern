import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../button';
import './styles.css';

export default function RequestPasswordReset() {
    const { user } = useContext(AuthContext); // Access the authenticated user context
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [showForm, setShowForm] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle password reset request
    async function handlePasswordReset(e) {
        e.preventDefault(); // Prevent default form submission
        try {
            setLoading(true); // Show loading indicator
            setError(null); // Reset error state

            const res = await fetch(`/api/request-password-reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }) // Send email in request body
            });

            const data = await res.json();
            if (data.success) {
                setMessage(data.message); // Show success message
            } else if (res.status === 429) { // Check for rate limit status code
                setError(data.message) // Show rate limit error
            } else {
                setError(data.message); // Show other errors
            }
        } catch (err) {
            setError(err.message); // Catch and show network or other errors
        } finally {
            setLoading(false); // Hide loading indicator
            setShowForm(false); // Hide form after submission
        }
    }

    // Redirect to profile if user is already logged in
    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    if (loading) return <div>Loading...</div> // Show loading indicator when loading is true

    return (
        <div className='request-password-reset-container'>
            {
                showForm &&
                <>
                    <form onSubmit={handlePasswordReset}>
                        <h1>Request Password Reset</h1>
                        <div className='request-password-reset-inputs-container'>
                            <div className='request-password-reset-input'>
                                <label htmlFor='email'>Email:</label>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Email'
                                    required
                                />
                            </div>
                        </div>
                    </form>
                    <div className='request-password-reset-button-container'>
                        <Button onClick={handlePasswordReset} buttonText={'Request Password Reset'} />
                        <Button onClick={() => navigate('/login')} buttonText={'Return to login form'} />
                    </div>
                </>

            }
            {message && <div>{message}</div>} {/* Show success message */}
            {error && <div>{error}</div>} {/* Show error message */}
        </div>
    )
}