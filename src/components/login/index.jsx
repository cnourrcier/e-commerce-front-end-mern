
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../button';
import './styles.css';

export default function Login() {
    const navigate = useNavigate();
    const { user, setUser, loading } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // Function to handle the login process
    async function handleLogin(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            // Send login request to the backend
            const res = await fetch(`/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Ensure cookies are included in the request
            });
            const data = await res.json();

            if (data.success && data.isVerified) {
                // Handle successful login
                setUser({
                    _id: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    role: data.role
                });
                alert('Login successful');
            } else if (!data.isVerified) {
                // Handle unverified user case
                setError(data.message);
            } else {
                // Handle login failure
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            // Handle any errors that occur during the request
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Redirect user to profile if already logged in
    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    // Display loading message while the request is being processed
    if (loading) return <div>Loading...</div>

    return (
        <div className='login-container'>
            <form>
                <h1>Login</h1>
                <div className='login-inputs-container'>
                    <div className='login-input'>
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
                    <div className='login-input'>
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
                    </div>
                    <div className='login-button'>
                        <Button onClick={handleLogin} buttonText={'Login'} />
                    </div>
                </div>
                <p>Forgot your password? Click <a href='/request-password-reset'>here</a>.</p>
            </form>
            <div className='login-bottom-links'>
                <p>Don't have an account? Sign up <a href='/signup'>here</a>.</p>
                <p>Didn't receive a verification email? Click <a href='/resend-verification-email'>here</a> to resend.</p>
            </div>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}


// Explanation of the login flow:
// User Logs In: The user submits the login form, and the handleLogin function is called.
// Token is Set in HttpOnly Cookie: The backend sets the token in an HttpOnly cookie.
// User State is Set on Successful Login: The handleLogin function updates the user state in the AuthContext.
// Navigate to Profile: The user is redirected to /profile.
// Protected Route: The ProtectedRoute component checks the authentication status. 
// Since the user state is already set, it allows access to the /profile route without re-fetching the authentication status.

// Summary:
// User State: The user state is set once during login, and the AuthContext is used to manage this state.
// Protected Routes: The ProtectedRoute component ensures that only authenticated users can access certain routes.
// Initial Authentication Check: The AuthContext performs an initial check to see if the user is authenticated when the app loads.