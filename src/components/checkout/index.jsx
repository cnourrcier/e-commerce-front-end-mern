import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from '../button';
import { numberWithCommas } from "../../utils/format";
import './styles.css';

export default function Checkout() {
    const navigate = useNavigate();
    const { cart, removeAllFromCart } = useContext(ShoppingCartContext); // Access the shopping cart context
    const { user } = useContext(AuthContext); // Access the authenticated user context
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [confirm, setConfirm] = useState(false);

    // Constants for shipping and tax
    const shippingAndHandling = 6.99;
    const taxRate = 0.101;

    // Calculate order totals
    const itemsSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const totalBeforeTax = itemsSubtotal + shippingAndHandling;
    const estimatedTax = totalBeforeTax * taxRate;
    const rawTotal = totalBeforeTax + estimatedTax;
    const orderTotal = parseFloat(rawTotal.toFixed(2));

    // Handle the checkout process
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
                credentials: 'include' // // Ensure cookies are included in the request
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

    // Handle the payment process
    async function handlePayment() {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/orders/mock-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: orderTotal }),
                credentials: 'include' // Ensure cookies are included in the request
            });

            const data = await res.json();

            if (data.success) {
                alert(data.message);
                removeAllFromCart(); // Clear the cart after successful payment
            } else {
                setLoading(false);
                setError(data.message || 'Payment failed');
            }
        } catch (err) {
            setLoading(false);
            setError('Payment failed');
        }
    }
    // Redirect to cart page if the cart is empty
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
                        <div className='checkout-user-info-container'>
                            <h3>Review Your Order</h3>
                            <p><strong>Name:</strong> {user.firstName + ' ' + user.lastName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Address:</strong> {user.address}</p>
                        </div>
                        <div className='checkout-subtotals-container'>
                            <div className='checkout-subtotals-title-container'>
                                <h3>Order Summary</h3>
                                <p>Items:</p>
                                <p>Shipping & handling:</p>
                                <p>Total before tax:</p>
                                <p>Estimated tax to be collected:</p>
                            </div>
                            <div className='checkout-subtotals-price-container'>
                                <p>${numberWithCommas(itemsSubtotal.toFixed(2))}</p>
                                <p>${numberWithCommas(shippingAndHandling)}</p>
                                <p>${numberWithCommas(totalBeforeTax.toFixed(2))}</p>
                                <p>${numberWithCommas(estimatedTax.toFixed(2))}</p>
                            </div>
                        </div>
                        <hr />
                        <div className='checkout-total-container'>
                            <span>Order total: </span><span>${numberWithCommas(orderTotal)}</span>
                        </div>
                        {!confirm ? (
                            <div className='checkout-button-container'>
                                <Button onClick={handleCheckout} buttonText={'Confirm Order'} />
                                <Button onClick={() => navigate('/update-info')} buttonText={'Update Info'} />
                            </div>
                        ) : (
                            <div className='confirmation-container'>
                                <div className='confirmation-text-container'>
                                    <h3>Confirm Your Payment</h3>
                                    <p><strong>Order total:</strong> ${numberWithCommas(orderTotal)}</p>
                                </div>
                                <div className='confirmation-button-container'>
                                    <Button onClick={handlePayment} buttonText={'Pay Now'} />
                                    <Button onClick={() => setConfirm(false)} buttonText={'Back to Order Review'} />
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}

            {error && <div className='checkout-error-message'>{error}</div>}
        </div>
    )
}