import React, { useContext } from 'react';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import './styles.css';
import Button from '../button';

export default function ShoppingCart() {
    const { cart, removeProduct, clearCart } = useContext(ShoppingCartContext);

    return (
        <div className='shopping-cart-container'>
            <h2>Shopping Cart</h2>
            <ul>
                {cart.map(product => (
                    <li className='cart-item' key={product.id}>
                        {product.title} - ${product.price}
                        <button className='cart-item-button' onClick={() => removeProduct(product.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <Button onClick={clearCart} buttonText={'Remove all items from cart'} />
        </div>
    )
}