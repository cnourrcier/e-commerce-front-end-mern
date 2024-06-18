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

    return (
        <div className='shopping-cart-container'>
            <h2>Shopping Cart</h2>
            <div className='shopping-cart-items-container'>
                <ul>
                    {cart.map((item, index) => (
                        <li className='cart-item' key={item.product._id || index}>
                            <div className='cart-item-title'>
                                <span>{item.product.title}</span>
                            </div>
                            <div className='cart-item-details'>
                                <div className='price-container'>
                                    <span className='details-title'>price:</span>${item.product.price}
                                </div>
                                <div className='qty-container'>
                                    <span className='details-title'>qty:</span> {item.quantity}
                                </div>
                                <input
                                    type='number'
                                    min='1'
                                    max={item.quantity}
                                    value={quantityToRemove[item.product._id] || 1}
                                    onChange={(e) => handleQuantityChange(item.product._id, e.target.value)}
                                />
                                <Button onClick={() => handleRemoveClick(item.product._id)} buttonText={'Remove'} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Button onClick={() => navigate('/checkout')} buttonText={'Proceed to checkout'} />
            <Button onClick={removeAllFromCart} buttonText={'Remove all items from cart'} />
        </div>
    )
}