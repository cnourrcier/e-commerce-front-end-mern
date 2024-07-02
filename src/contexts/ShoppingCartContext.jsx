import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

// Create a context for the shopping cart
export const ShoppingCartContext = createContext();

// ShoppingCartProvider component to provide shopping cart state and functions to its children
export function ShoppingCartProvider({ children }) {
    const { user } = useContext(AuthContext); // Access authenticated user context
    const [cart, setCart] = useState([]); // State to hold cart items
    const [loading, setLoading] = useState(true);
    const [version, setVersion] = useState(0); // State to track cart version

    // Function to fetch the shopping cart from the server
    async function fetchCart() {
        try {
            const res = await fetch(`/api/cart`, {
                credentials: 'include' // Ensure cookies are included in the request 
            });
            const data = await res.json();
            if (data.success) {
                setCart(data.cart.items); // Update cart state with fetched items
            } else {
                console.error(data.message); // Log error message if fetch fails
            }
        } catch (err) {
            console.error('Failed to fetch cart', err); // Log any errors during fetch
        } finally {
            setLoading(false); // set loading to false once the request is complete
        }
    };

    // Function to add an item to the cart
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
                setCart(data.cart.items); // Update cart state with new items
            } else {
                console.error(data.message); // Log error message if add fails
            }
        } catch (err) {
            console.error('Failed to add to cart', err); // Log any errors during add
        }
    };

    // Function to remove an item from the cart
    async function removeFromCart(productId, quantity) {
        try {
            const res = await fetch(`/api/cart/remove`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity }),
                credentials: 'include' // Ensure cookies are included in the response
            });
            const data = await res.json();
            if (data.success) {
                setCart(data.cart.items); // Update cart state with remaining items
            } else {
                console.error(data.message); // Log error message if remove fails
            }
        } catch (err) {
            console.error('Failed to remove from cart', err); // Log any errors during remove
        }
    }

    // Function to remove all items from the cart
    async function removeAllFromCart() {
        try {
            const res = await fetch(`/api/cart/removeAll`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include' // Ensure cookies are included in the response
            });
            const data = await res.json();
            if (data.success) {
                setCart(data.cart.items); // Update cart state with empty items
            } else {
                console.error(data.message); // Log error message if removeAll fails
            }
        } catch (err) {
            console.error('Failed to remove from cart', err); // Log any errors during removeAll
        }
    }

    // Function to update the cart and increment the version
    const updateCart = (newCart) => {
        setCart(newCart);
        setVersion(prevVersion => prevVersion + 1);
    }

    // Fetch the cart when the user is logged in 
    useEffect(() => {
        if (user) {
            fetchCart();
        }
    }, [user]);

    return (
        // Provide the cart state, loading status, and cart-related functions to the context 
        <ShoppingCartContext.Provider value={{ cart, loading, addToCart, removeFromCart, removeAllFromCart, updateCart, version }}>
            {children}
        </ShoppingCartContext.Provider>
    )

}

