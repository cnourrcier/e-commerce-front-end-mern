import React, { useContext, useState } from 'react';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import Button from '../button';
import './styles.css';
import { useNavigate } from 'react-router-dom';

export default function ShoppingCart() {
    const { cart, removeFromCart, removeAllFromCart } = useContext(ShoppingCartContext);
    const [quantityToRemove, setQuantityToRemove] = useState({});
    const navigate = useNavigate();

    function handleQuantityChange(productId, value) {
        setQuantityToRemove({
            ...quantityToRemove,
            [productId]: parseInt(value, 10)
        });
    };

    function handleRemoveClick(productId) {
        const quantity = quantityToRemove[productId] || 1;
        removeFromCart(productId, quantity);
        setQuantityToRemove({
            ...quantityToRemove,
            [productId]: 1
        });
    }

    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <div className='shopping-cart-container'>
            <h2>Shopping Cart</h2>
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
                                    ${item.product.price}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className='subtotal-container'>
                    <span className='subtotal-title'>Subtotal ({cart.length} items): </span> <b>${totalPrice.toFixed(2)}</b>
                </div>
            </div>
            <Button onClick={() => navigate('/checkout')} buttonText={'Proceed to checkout'} />
            <Button onClick={removeAllFromCart} buttonText={'Remove all items from cart'} />
        </div>
    )
}