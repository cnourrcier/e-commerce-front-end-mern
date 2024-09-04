import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Button from '../../components/button';
import './styles.css';

export default function UpdateUserInfo() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext); // Access authenticated user context
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    // Function to handle saving updated user information
    async function handleSave(e) {
        e.preventDefault();

        try {
            setLoading(true); // Set loading to true to indicate the start of the saving process
            setError(null); // Reset any previous errors

            // Make a PUT request to update the user's account information
            const res = await fetch(`/api/account/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, address }), // Send the updated user information in the request body
                credentials: 'include'
            });
            const data = await res.json();

            // Handle the response from the server
            if (data.success) {
                setLoading(false); // Set loading to false once the request is completed
                setUser(data.user); // Update the user context with the new user data
                setMessage(data.message); // Set the success message
                navigate('/checkout'); // Navigate to the checkout page
            } else {
                setLoading(false); // Set loading to false if the request failed
                setError(data.message); // Set the error message
            }
        } catch (err) {
            setError(err.message); // Set the error message if an exception is thrown
        }
    };

    if (loading) <div>Loading...</div>; // Display loading message while request is being processed

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