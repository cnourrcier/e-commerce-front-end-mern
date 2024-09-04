import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import { numberWithCommas } from '../../utils/format';
import Button from '../../components/button';
import './styles.css';


export default function ShoppingCart() {
    const { cart, removeFromCart, removeAllFromCart } = useContext(ShoppingCartContext);
    const [quantityToRemove, setQuantityToRemove] = useState({});
    const navigate = useNavigate();

    // Handle changes in the quantity input field
    function handleQuantityChange(productId, value) {
        setQuantityToRemove({
            ...quantityToRemove,
            [productId]: parseInt(value, 10) // Update quantity for the specified product
        });
    };

    // Handle the removal of a product from the cart
    function handleRemoveClick(productId) {
        const quantity = quantityToRemove[productId] || 1; // Default to removing 1 if no specific quantity is set
        removeFromCart(productId, quantity);
        setQuantityToRemove({
            ...quantityToRemove,
            [productId]: 1 // Reset the quantity to remove for this product to 1
        });
    }

    // Calculate the total price of items in the cart
    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    // Calculate the total quantity of items in the cart
    const totalQty = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className='shopping-cart-container'>
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <div>No items in cart</div>
            ) : (
                <>
                    <div className='shopping-cart-items-container'>
                        <div className='shopping-cart-items-header-container'>
                            <div>qty:</div>
                            <div>price:</div>
                        </div>
                        <ul>
                            {cart.map((item, index) => (
                                <li className='cart-item' key={item.product._id || index}>
                                    <div className='cart-item-title'>
                                        <span>{item.product.title}</span>
                                    </div>
                                    <div className='cart-item-details'>
                                        <input
                                            type='number'
                                            min='1'
                                            max={item.quantity}
                                            value={quantityToRemove[item.product._id] || 1}
                                            onChange={(e) => handleQuantityChange(item.product._id, e.target.value)}
                                        />
                                        <Button onClick={() => handleRemoveClick(item.product._id)} buttonText={'Remove'} />
                                        <div></div>
                                        <div className='qty-container'>
                                            {item.quantity}
                                        </div>
                                        <div className='price-container'>
                                            ${numberWithCommas(item.product.price)}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className='subtotal-container'>
                            <span className='subtotal-title'>Subtotal ({totalQty} items): </span> <b>${numberWithCommas(totalPrice.toFixed(2))}</b>
                        </div>
                    </div>
                    <Button onClick={() => navigate('/checkout')} buttonText={'Proceed to checkout'} />
                    <Button onClick={removeAllFromCart} buttonText={'Remove all items from cart'} />
                </>
            )}
        </div>
    )
}