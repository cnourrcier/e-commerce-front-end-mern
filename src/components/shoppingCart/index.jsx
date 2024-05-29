import React, { useContext } from 'react';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';


export default function ShoppingCart() {
    const { cart, removeProduct, clearCart } = useContext(ShoppingCartContext);

    return (
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {cart.map(product => (
                    <li key={product.id}>
                        {product.title} - ${product.price}
                        <button onClick={() => removeProduct(product.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={clearCart}>Remove all items from cart</button>
        </div>
    )
}