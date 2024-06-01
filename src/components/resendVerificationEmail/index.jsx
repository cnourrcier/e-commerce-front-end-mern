import { useState } from 'react';
import './styles.css';

export default function ResendVerificationEmail() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleResendVerificationEmail() {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            const res = await fetch('http://localhost:5000/api/resend-verification-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            setMessage(data.message);
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
            <form onSubmit={handleResendVerificationEmail}>
                <h1>Resend Verification Email</h1>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name='email'
                    id='email'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    required
                />
                <button type='submit' disabled={loading}>Resend Verification Email</button>
                {message && <div>{message}</div>}
                {error && <div>{error}</div>}
            </form>
        </div>
    )
}
