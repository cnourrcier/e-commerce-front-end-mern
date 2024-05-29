import React, { useContext } from 'react';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';

export default function AddToCartButton({ product }) {
    const { addProduct } = useContext(ShoppingCartContext);

    return (
        <button onClick={() => addProduct(product)}>
            Add to Cart
        </button>
    );
};