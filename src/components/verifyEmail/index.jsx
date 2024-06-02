import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './styles.css';

export default function VerifyEmail() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function verifyEmail() {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/verify-email/${token}`)
            const data = await res.json();
            if (data.message === 'Email verified successfully') {
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