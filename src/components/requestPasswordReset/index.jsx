import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../button';
import './styles.css';

export default function RequestPasswordReset() {
    const { user } = useContext(AuthContext);
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

            const res = await fetch(`/api/request-password-reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            if (data.success) {
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

    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    if (loading) return <div>Loading...</div>

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
            {message && <div>{message}</div>}
            {error && <div>{error}</div>}
        </div>
    )
}