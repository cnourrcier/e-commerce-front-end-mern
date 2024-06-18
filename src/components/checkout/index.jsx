import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { AuthContext } from "../../contexts/AuthContext";
import Button from '../button';
import './styles.css';

export default function Checkout() {
    const { cart, removeAllFromCart } = useContext(ShoppingCartContext);
    const { user } = useContext(AuthContext);
    const [address, setAddress] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleCheckout(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address, cart }),
                credentials: 'include'
            });
            const data = await res.json();

            if (data.success) {
                setSuccess(true);
                removeAllFromCart();
            } else {
                setError(data.message || 'Checkout failed');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            // navigate to payment page
        }
    }


    if (loading) return <div>Loading...</div>;
    if (success) return <div>Checkout successful! Thank you for your order!</div>;

    return (
        <div className='checkout-container'>
            <h2>Checkout</h2>
            <form>
                <label htmlFor='name'>Name:</label>
                <input
                    type='text'
                    id='name'
                    value={user.firstName + ' ' + user.lastName}
                    readOnly
                />
                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    id='email'
                    value={user.email}
                    readOnly
                />
                <label htmlFor='address'>Address:</label>
                <input
                    type='text'
                    id='address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <h2>Order Summary</h2>
                <p>Items: </p>
                <p>Shipping & handling: </p>
                <p>Total before tax: </p>
                <p>Estimated tax to be collected: </p>
                <hr />
                <p>Order total: </p>
                <Button onClick={handleCheckout} buttonText={'Place Your Order and Pay'} />
            </form>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}