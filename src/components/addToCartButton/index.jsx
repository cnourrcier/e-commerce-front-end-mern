import React, { useContext, useState } from 'react';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../cartModalPopup/index';
import './styles.css';


export default function AddToCartButton({ customStyles = null, product }) {
    // Initialize hooks and state variables
    const { user } = useContext(AuthContext); // Access the authenticated user context
    const { addToCart } = useContext(ShoppingCartContext); // Access the shopping cart context
    const navigate = useNavigate();
    const [showModalPopup, setShowModalPopup] = useState(false);

    // Handle adding product to cart
    function handleClick() {
        addToCart(product._id, 1);
        setShowModalPopup(true); // Show modal popup after adding to cart
    };

    // Handle closing of modal popup
    function handleCloseModalPopup() {
        setShowModalPopup(false);
    }

    return (
        <>
            <button className={customStyles ? `add-to-cart-button ${customStyles}` : `add-to-cart-button`} onClick={!user ? () => navigate('/login') : handleClick}>
                Add to Cart
            </button>
            {showModalPopup && <Modal
                title={product.title}
                handleCloseModalPopup={handleCloseModalPopup}
            />
            }
        </>
    );
};