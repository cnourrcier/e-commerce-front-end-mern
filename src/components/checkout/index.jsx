import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from '../button';
import './styles.css';

export default function Checkout() {
    const navigate = useNavigate();
    const { cart, removeAllFromCart } = useContext(ShoppingCartContext);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [confirm, setConfirm] = useState(false);

    const shippingAndHandling = 6.99;
    const taxRate = 0.101;

    const itemsSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const totalBeforeTax = itemsSubtotal + shippingAndHandling;
    const estimatedTax = totalBeforeTax * taxRate;
    const rawTotal = totalBeforeTax + estimatedTax;
    const orderTotal = parseFloat(rawTotal.toFixed(2));

    async function handleCheckout() {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    address: user.address,
                    cart,
                    totalAmount: orderTotal,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }),
                credentials: 'include'
            });
            const data = await res.json();

            if (data.success) {
                // Move to payment confirmation step
                setConfirm(true);
            } else {
                setError(data.message || 'Checkout failed');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handlePayment() {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/orders/mock-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: orderTotal }),
                credentials: 'include'
            });

            const data = await res.json();

            if (data.success) {
                alert(data.message);
                removeAllFromCart();
            } else {
                setLoading(false);
                setError(data.message || 'Payment failed');
            }
        } catch (err) {
            setLoading(false);
            setError('Payment failed');
        }
    }

    useEffect(() => {
        if (cart.length === 0) navigate('/cart');
    }, [cart, navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className='checkout-container'>
            {message ? (
                <div>{message}</div>
            ) : (
                <>
                    <h2>Checkout</h2>
                    <div>
                        <h3>Review Your Order</h3>
                        <p><strong>Name:</strong> {user.firstName + ' ' + user.lastName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Address:</strong> {user.address}</p>
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
                        {!confirm ? (
                            <div className='checkout-button-container'>
                                <Button onClick={handleCheckout} buttonText={'Confirm Order'} />
                                <Button onClick={() => navigate('/update-info')} buttonText={'Update Info'} />
                            </div>
                        ) : (
                            <div className='confirmation-container'>
                                <h3>Confirm Your Payment</h3>
                                <p><strong>Order total:</strong> ${orderTotal}</p>
                                <Button onClick={handlePayment} buttonText={'Pay Now'} />
                                <Button onClick={() => setConfirm(false)} buttonText={'Back to Order Review'} />
                            </div>
                        )}
                    </div>
                </>
            )}

            {error && <div className='checkout-error-message'>{error}</div>}
        </div>
    )
}