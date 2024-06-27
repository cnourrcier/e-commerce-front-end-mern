import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Button from '../button';
import './styles.css';

export default function UpdateUserInfo() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    async function handleSave(e) {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`/api/account/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, address }),
                credentials: 'include'
            });
            const data = await res.json();

            if (data.success) {
                setLoading(false);
                setUser(data.user);
                setMessage(data.message);
                navigate('/checkout');
            } else {
                setLoading(false);
                setError(data.message || 'Failed to update account');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) <div>Loading...</div>;

    return (
        <div className='update-container'>
            <h2>Checkout</h2>
            <div className='confirmation-container'>
                <form>
                    <label htmlFor='firstName'>First Name:</label>
                    <input
                        type='text'
                        id='firstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <label htmlFor='lastName'>Last Name:</label>
                    <input
                        type='text'
                        id='lastName'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor='address'>Address:</label>
                    <input
                        type='text'
                        id='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <div className='update-button-container'>
                        <Button onClick={handleSave} buttonText={'Save'} />
                        <Button onClick={() => navigate('/checkout')} buttonText={'Cancel'} />
                    </div>
                </form>
                {error && <div className='error-message'>{error}</div>}
                {message && <div>{message}</div>}
            </div>
        </div>
    )
}