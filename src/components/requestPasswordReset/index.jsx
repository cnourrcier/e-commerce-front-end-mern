import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function RequestPasswordReset() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [showForm, setShowForm] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handlePasswordReset(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            const res = await fetch('http://localhost:5000/api/request-password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
            } else if (res.status === 429) { // Check for rate limit status code
                setError(data.message)
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setShowForm(false);
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className='request-password-reset-container'>
            {
                showForm &&
                <>
                    <form onSubmit={handlePasswordReset}>
                        <h1>Request Password Reset</h1>
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
                        <button type='submit' disabled={loading}>Request Password Reset</button>
                    </form>
                    <button onClick={() => navigate('/login')}>Return to login form</button>
                </>

            }
            {message && <div>{message}</div>}
            {error && <div>{error}</div>}
        </div>
    )
}