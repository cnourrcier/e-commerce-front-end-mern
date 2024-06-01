
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleLogin(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (data.token && data.isVerified) {
                // Handle successful login
                localStorage.setItem('authToken', data.token);
                alert('Login successful');
                navigate('/profile');
            } else if (!data.isVerified) {
                setError(data.message);
            } else {
                // Handle login failure
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>

    return (
        <div className='login-container'>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
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
                <p>Forgot your password? Click <a href='/request-password-reset'>here</a> to reset your password.</p>
                <button type='submit'>Login</button>
            </form>
            <p>Don't have an account? Sign up <a href='/signup'>here</a></p>
            <p>Didn't receive a verification email? Click <a href='/resend-verification-email'>here</a> to resend.</p>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}