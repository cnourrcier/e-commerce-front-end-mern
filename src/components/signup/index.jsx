import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';

export default function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [showForm, setShowForm] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSignup(e) {
        e.preventDefault();

        if (password != confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            setLoading(true);
            setError(null);

            const res = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (data.message == 'Verification email sent') {
                setMessage('Signup successful. Please check your email to verify your account.');
                setShowForm(false);
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>

    return (
        <div className='signup-container'>
            {
                showForm ?
                    <>
                        <form onSubmit={handleSignup}>
                            <h1>Sign up</h1>
                            <label htmlFor='name'>Name:</label>
                            <input
                                type='name'
                                name='name'
                                id='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Name'
                                required
                            />
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
                            <label htmlFor='password'>Password:</label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                required
                            />
                            <label htmlFor='confirmPassword'>Confirm Password:</label>
                            <input
                                type='password'
                                name='confirmPassword'
                                id='confirmPassword'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder='Confirm password'
                                required
                            />
                            <button type='submit'>Signup</button>
                            {error && <div className='error-message'>{error}</div>}
                        </form>
                        <p>Already have an account? Login <button type='button' onClick={() => navigate('/login')}>here</button></p>
                    </>
                    : <>
                        {message && <p>{message}</p>}
                        <p>Didn't receive the email? Click <a href='/resend-verification-email'>here</a> to resend.</p>
                    </>
            }
        </div>
    )
}