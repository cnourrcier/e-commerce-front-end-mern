import React, { useContext, useState } from 'react';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import './styles.css';
import Button from '../button';

export default function ShoppingCart() {
    const { cart, removeFromCart, removeAllFromCart } = useContext(ShoppingCartContext);

    return (
        <div className='shopping-cart-container'>
            <h2>Shopping Cart</h2>
            <ul>
                {cart.map((item, index) => (
                    <li className='cart-item' key={index}>
                        {item.product.title} - ${item.product.price} qty: {item.quantity}
                        <button className='cart-item-button' onClick={() => removeFromCart(item.product._id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <Button onClick={removeAllFromCart} buttonText={'Remove all items from cart'} />
        </div>
    )
}