import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../button";
import './styles.css';

export default function Signup() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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

            const res = await fetch(`http://localhost:5000/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password, confirmPassword }),
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

    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    if (loading) return <div>Loading...</div>

    return (
        <div className='signup-container'>
            {
                showForm ?
                    <>
                        <form>
                            <h1>Sign up</h1>
                            <div className='signup-inputs-container'>
                                <div className='signup-name-input-container'>
                                    <div className='signup-input'>
                                        <label htmlFor='firstName'>First Name:</label>
                                        <input
                                            type='name'
                                            name='firstName'
                                            id='firstName'
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder='First Name'
                                            required
                                        />
                                    </div>
                                    <div className='signup-input'>
                                        <label htmlFor='lastName'>Last Name:</label>
                                        <input
                                            type='name'
                                            name='lastName'
                                            id='lastName'
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder='Last Name'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='signup-input'>
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
                                <div className='signup-password-input-container'>
                                    <div className='signup-input'>
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
                                    <div className='signup-input'>
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
                                    </div>
                                </div>
                                <Button onClick={handleSignup} buttonText={'Signup'} />
                            </div>
                            {error && <div className='error-message'>{error}</div>}
                        </form>
                        <p>Already have an account? Login <a href='/login'>here</a>.</p>
                    </>
                    : <>
                        {message && <p>{message}</p>}
                        <p>Didn't receive the email? Click <a href='/resend-verification-email'>here</a> to resend.</p>
                    </>
            }
        </div>
    )
}