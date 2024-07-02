import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './styles.css';

export default function VerifyEmail() {
    const { token } = useParams(); // Extract the token parameter from the URL
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to verify the email using the token
    async function verifyEmail() {
        try {
            setLoading(true); // Set loading to true to indicate the start of the request
            setError(null); // Reset any previous errors

            // Make a GET request to verify the email with the provided token
            const res = await fetch(`/api/verify-email/${token}`)
            const data = await res.json();

            // Handle the response from the server
            if (data.success) {
                setMessage(data.message); // Set the success message
                setTimeout(() => {
                    navigate('/login'); // Navigate to the login page after a delay
                }, 2000);
            } else {
                setError(data.message); // Set the error message if the request failed
            }
        } catch (err) {
            setError(err.message); // Set the error message if an exception is thrown
        } finally {
            setLoading(false); // Set loading to false once the request is completed
        }
    }

    // Call verifyEmail when the component mounts
    useEffect(() => {
        verifyEmail();
    }, [token, navigate]); // Dependencies: token and navigate

    return (
        <div className='verify-email-container'>
            {loading && <div>Loading...</div>}
            {message && <div>{message}</div>}
            {error && <div>{error}</div>}
        </div>
    );
}