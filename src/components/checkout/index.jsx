import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from '../button';
import './styles.css';

export default function Checkout() {
    const { cart, removeAllFromCart } = useContext(ShoppingCartContext);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [address, setAddress] = useState(user.address || '');
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [success, setSuccess] = useState(false);
    const [editInfo, setEditInfo] = useState(false);
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

        // Use the existing user information if no changes are made
        const updatedFirstName = firstName || user.firstName;
        const updatedLastName = lastName || user.lastName;
        const updatedEmail = email || user.email;
        const updatedAddress = address || user.address;

        try {
            const res = await fetch(`api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address: updatedAddress, cart, totalAmount: orderTotal, firstName: updatedFirstName, lastName: updatedLastName, email: updatedEmail }),
                credentials: 'include'
            });
            const data = await res.json();

            if (data.success) {
                setSuccess(true);
                removeAllFromCart();
                // Update user context with new information
                setUser({ ...user, firstName: updatedFirstName, lastName: updatedLastName, email: updatedEmail, address: updatedAddress });
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
    if (cart.length === 0) navigate('/cart');
    if (loading) return <div>Loading...</div>;
    if (success) return <div>Checkout successful! Thank you for your order!</div>;

    return (
        <div className='checkout-container'>
            <h2>Checkout</h2>
            {!editInfo ? (
                <>
                    <div className='confirmation-container'>
                        <h3>Review Your Order</h3>
                        <p><strong>Name:</strong> {firstName + ' ' + lastName}</p>
                        <p><strong>Email:</strong> {email}</p>
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
                            <Button onClick={() => setEditInfo(true)} buttonText={'Edit Info'} />
                        </div>
                    </div>
                    {error && <div className='error-message'>{error}</div>}
                </>

            ) : (
                <>
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
                        {address && <Button onClick={() => setEditInfo(false)} buttonText={'Review Order'} />}
                    </form>
                    {error && <div className='error-message'>{error}</div>}
                </>
            )}
        </div>
    )
}