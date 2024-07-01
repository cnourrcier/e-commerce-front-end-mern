import { useState } from 'react';
import Button from '../button';
import './styles.css';

export default function ResendVerificationEmail() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    async function handleResendVerificationEmail(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`/api/resend-verification-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
            } else if (res.status === 429) { // Check for rate limit status code
                console.log(data);
                setError(data.message)
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
            setMessage(data.message);
        } finally {
            setLoading(false);
        }
    }

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
