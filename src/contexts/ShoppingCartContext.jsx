import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export const ShoppingCartContext = createContext();

export function ShoppingCartProvider({ children }) {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [version, setVersion] = useState(0);

    async function fetchCart() {
        try {
            const res = await fetch(`/api/cart`, {
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
            const res = await fetch(`/api/cart/add`, {
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
            const res = await fetch(`/api/cart/remove`, {
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
            const res = await fetch(`/api/cart/removeAll`, {
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

    const updateCart = (newCart) => {
        setCart(newCart);
        setVersion(prevVersion => prevVersion + 1);
    }

    useEffect(() => {
        if (user) {
            fetchCart();
        }
    }, [user]);

    return (
        <ShoppingCartContext.Provider value={{ cart, loading, addToCart, removeFromCart, removeAllFromCart, updateCart, version }}>
            {children}
        </ShoppingCartContext.Provider>
    )

}

