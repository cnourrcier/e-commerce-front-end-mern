
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

            if (data.success && data.isVerified) {
                // Handle successful login
                alert('Login successful');
                navigate('/profile');
            } else if (!data.isVerified) {
                alert('Login failed. Please verify your email first.');
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
                <p>Forgot your password? Click <button type='button' onClick={() => navigate('/requestpasswordreset')}>here</button> to reset your password.</p>
                <button type='submit'>Login</button>
                {error && <div className='error-message'>{error}</div>}
            </form>
            <p>Don't have an account? Sign up <button type='button' onClick={() => navigate('/signup')}>here</button></p>
        </div>
    )
}