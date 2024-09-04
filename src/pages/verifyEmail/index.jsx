import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function VerifyEmail() {
    const { token } = useParams(); // Extract the token parameter from the URL
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to verify the email using the token
    async function verifyEmail() {
        try {
            setLoading(true);
            setError(null);

            // Make a GET request to verify the email with the provided token
            const res = await fetch(`/api/verify-email/${token}`)
            const data = await res.json();

            // Handle the response from the server
            if (data.success) {
                setMessage(data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // Call verifyEmail when the component mounts
    useEffect(() => {
        verifyEmail();
    }, [token, navigate]);

    return (
        <div className='verify-email-container'>
            {loading && <div>Loading...</div>}
            {message && <div>{message}</div>}
            {error && <div>{error}</div>}
        </div>
    );
}