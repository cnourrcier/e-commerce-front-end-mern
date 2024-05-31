import { useContext, useState } from "react"
import { LoginSignupContext } from "../../contexts/LoginSignupContext";


export default function Signup({ handleSwitch }) {
    const { setHasAccount } = useContext(LoginSignupContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSignup(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            const res = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (data.success) {
                alert('Signup successful');
                setHasAccount(true);
            } else {
                alert('Sign up failed');
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
        <div className='signup-container'>
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
                {/* <label htmlFor='confirmPassword'>Confirm Password:</label>
                <input
                    type='confirmPassword'
                    name='confirmPassword'
                    id='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confirm password'
                    required
                /> */}
                <button type='submit'>Signup</button>
            </form>
            <p>Already have an account? Login <button type='button' onClick={() => setHasAccount(true)}>here</button></p>
        </div>
    )
}