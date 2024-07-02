import React, { useContext, useState } from 'react';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import Modal from '../cartModalPopup/index';
import { AuthContext } from '../../contexts/AuthContext';
import './styles.css';
import { useNavigate } from 'react-router-dom';

export default function AddToCartButton({ product }) {
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
            <button className={`add-to-cart-button`} onClick={!user ? () => navigate('/login') : handleClick}>
                Add to Cart <img className={`add-to-cart-icon ${!user && 'disabled'}`} src={`/img/plus-circle.svg`} />
            </button>
            {showModalPopup && <Modal
                title={product.title}
                handleCloseModalPopup={handleCloseModalPopup}
            />
            }
        </>
    );
};