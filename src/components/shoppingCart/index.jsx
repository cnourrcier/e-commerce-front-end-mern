import React, { useContext, useState } from 'react';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import './styles.css';
import Button from '../button';

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
    // console.log('quantityToRemove:', quantityToRemove);

    return (
        <div className='shopping-cart-container'>
            <h2>Shopping Cart</h2>
            <ul>
                {cart.map((item, index) => (
                    <li className='cart-item' key={item.product._id || index}>
                        {item.product._id} - ${item.product.price} qty: {item.quantity}
                        <div>
                            <input
                                type='number'
                                min='1'
                                max={item.quantity}
                                value={quantityToRemove[item.product._id] || 1}
                                onChange={(e) => handleQuantityChange(item.product._id, e.target.value)}
                            />
                            <button className='cart-item-button' onClick={() => handleRemoveClick(item.product._id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <Button onClick={removeAllFromCart} buttonText={'Remove all items from cart'} />
        </div>
    )
}