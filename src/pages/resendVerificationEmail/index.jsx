import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../../components/button';
import './styles.css';


export default function ResendVerificationEmail() {
    const { user } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Function to handle resending the verification email
    async function handleResendVerificationEmail(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            // Send POST request to the API to resend verification email
            const res = await fetch(`/api/resend-verification-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            if (data.success) {
                setMessage(data.message);
            } else if (res.status === 429) { // Check for rate limit status code
                setError(data.message) // Set rate limit error
            } else {
                setError(data.message); // Set other errors
            }
        } catch (err) {
            setError(err.message); // Catch and set network or other errors
            setMessage(data.message);
        } finally {
            setLoading(false);
        }
    }

    // Redirect to profile if user is already logged in
    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    if (loading) return <div>Loading...</div>

    return (
        <div className='resend-verification-email-container'>
            <form>
                <h1>Resend Verification Email</h1>
                <div className='resend-verification-email-inputs-container'>
                    <div className='resend-verification-email-input'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name='email'
                            id='email'
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                            required
                        />
                    </div>
                </div>
                <div className='resend-verification-email-button-container'>
                    <Button onClick={handleResendVerificationEmail} buttonText={'Resend Verification Email'} />
                </div>
                {message && <div>{message}</div>}
                {error && <div>{error}</div>}
            </form>
        </div>
    )
}
