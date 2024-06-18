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
    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const shippingAndHandling = 6.99;
    const taxRate = 0.101;

    const itemsSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const totalBeforeTax = itemsSubtotal + shippingAndHandling;
    const estimatedTax = totalBeforeTax * taxRate;
    const rawTotal = totalBeforeTax + estimatedTax;
    const orderTotal = parseFloat(rawTotal.toFixed(2));

    async function handleCheckout(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address, cart, totalAmount: orderTotal }),
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
            {confirm ? (
                <>
                    <form>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            id='name'
                            defaultValue={user.firstName + ' ' + user.lastName}
                            required
                        />
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            defaultValue={user.email}
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
                        <h2>Order Summary</h2>
                        <div className='checkout-subtotals-container'>
                            <div className='checkout-subtotals-title-container'>
                                <p>Items:</p>
                                <p>Shipping & handling:</p>
                                <p>Total before tax:</p>
                                <p>Estimated tax to be collected:</p>
                            </div>
                            <div className='checkout-subtotals-price-container'>
                                <p>${itemsSubtotal.toFixed(2)}</p>
                                <p>${shippingAndHandling}</p>
                                <p>${totalBeforeTax.toFixed(2)}</p>
                                <p>${estimatedTax.toFixed(2)}</p>
                            </div>
                        </div>
                        <hr />
                        <div className='checkout-total-container'>
                            <span>Order total: </span><span>${orderTotal}</span>
                        </div>
                        <Button onClick={() => setConfirm(false)} buttonText={'Back to Review Order'} />
                    </form>
                    {error && <div className='error-message'>{error}</div>}
                </>
            ) : (
                <>
                    <div className='confirmation-container'>
                        <h3>Review Your Order</h3>
                        <p><strong>Name:</strong> {user.firstName + ' ' + user.lastName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Address:</strong> {address}</p>
                        <h3>Order Summary</h3>
                        <div className='checkout-subtotals-container'>
                            <div className='checkout-subtotals-title-container'>
                                <p>Items:</p>
                                <p>Shipping & handling:</p>
                                <p>Total before tax:</p>
                                <p>Estimated tax to be collected:</p>
                            </div>
                            <div className='checkout-subtotals-price-container'>
                                <p>${itemsSubtotal.toFixed(2)}</p>
                                <p>${shippingAndHandling}</p>
                                <p>${totalBeforeTax.toFixed(2)}</p>
                                <p>${estimatedTax.toFixed(2)}</p>
                            </div>
                        </div>
                        <hr />
                        <div className='checkout-total-container'>
                            <span>Order total: </span><span>${orderTotal}</span>
                        </div>
                        <div className='button-container'>
                            <Button onClick={handleCheckout} buttonText={'Place Your Order and Pay'} />
                            <Button onClick={() => setConfirm(true)} buttonText={'Edit Info'} />
                        </div>
                    </div>
                    {error && <div className='error-message'>{error}</div>}
                </>
            )}
        </div>
    )
}