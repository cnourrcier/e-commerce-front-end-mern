import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export const ShoppingCartContext = createContext();

export function ShoppingCartProvider({ children }) {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchCart() {
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/cart`, {
                credentials: 'include' // Ensure cookies are included in the request 
            });
            const data = await res.json();
            if (data.success) {
                setCart(data.cart.items);
            } else {
                console.error(data.message);
            }
        } catch (err) {
            console.error('Failed to fetch cart', err);
        } finally {
            setLoading(false);
        }
    };

    async function addToCart(productId, quantity) {
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/cart/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity }),
                credentials: 'include' // Ensure cookies are included in the request
            });
            const data = await res.json();
            if (data.success) {
                setCart(data.cart.items);
            } else {
                console.error(data.message);
            }
        } catch (err) {
            console.error('Failed to add to cart', err);
        }
    };

    async function removeFromCart(productId, quantity) {
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/cart/remove`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity }),
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                setCart(data.cart.items);
            } else {
                console.error(data.message);
            }
        } catch (err) {
            console.error('Failed to remove from cart', err);
        }
    }

    async function removeAllFromCart() {
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/cart/removeAll`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                setCart(data.cart.items);
            } else {
                console.error(data.message);
            }
        } catch (err) {
            console.error('Failed to remove from cart', err);
        }
    }

    useEffect(() => {
        if (user) {
            fetchCart();
        }
    }, [user]);

    return (
        <ShoppingCartContext.Provider value={{ cart, loading, addToCart, removeFromCart, removeAllFromCart }}>
            {children}
        </ShoppingCartContext.Provider>
    )

}

