
import { useContext, useState } from 'react';
import './styles.css';
import Signup from '../signup';
import { LoginSignupContext } from '../../contexts/LoginSignupContext';

export default function Login() {
    const { hasAccount, setHasAccount } = useContext(LoginSignupContext);
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
            console.log(data);
            if (data.success) {
                // Handle successful login
                alert('Login successful');
            } else {
                // Handle login failure
                alert('Login failed');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <>
            {
                hasAccount
                    ? <div className='login-container'>
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
                            <button type='submit'>Login</button>
                        </form>
                        <p>Don't have an account? Sign up <button type='button' onClick={() => setHasAccount(false)}>here</button></p>
                    </div>
                    : <Signup />
            }
        </>
    )
}