import React, { useContext, useState } from 'react';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import Button from '../button';
import './styles.css';

export default function ShoppingCart() {
    const { cart, removeFromCart, removeAllFromCart } = useContext(ShoppingCartContext);
    const [quantityToRemove, setQuantityToRemove] = useState({});

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
                                <span>${item.product.price}</span>
                                <span><span className='qty'>qty:</span> {item.quantity}</span>
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
            <Button onClick={removeAllFromCart} buttonText={'Remove all items from cart'} />
        </div>
    )
}