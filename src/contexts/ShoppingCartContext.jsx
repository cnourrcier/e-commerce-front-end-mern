import React, { createContext, useEffect, useState } from 'react';

export const ShoppingCartContext = createContext();

export function ShoppingCartProvider({ children }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('shoppingCart'));
        if (storedCart) setCart(storedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }, [cart]);

    function addProduct(product) {
        setCart((prevCart) => [...prevCart, product]);
    };

    function removeProduct(productId) {
        setCart((prevCart) => prevCart.filter(product => product.id !== productId));
    }

    function clearCart() {
        setCart([]);
    };

    return (
        <ShoppingCartContext.Provider value={{ cart, addProduct, removeProduct, clearCart }}>
            {children}
        </ShoppingCartContext.Provider>
    )

}

