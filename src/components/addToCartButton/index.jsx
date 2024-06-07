import React, { useContext, useState } from 'react';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import Modal from '../cartModalPopup/index';
import { AuthContext } from '../../contexts/AuthContext';
import './styles.css';

export default function AddToCartButton({ product }) {
    const { user } = useContext(AuthContext);
    const { addToCart } = useContext(ShoppingCartContext);
    const [showModalPopup, setShowModalPopup] = useState(false);

    function handleClick() {
        addToCart(product._id, 1);
        setShowModalPopup(true);
    };

    function handleCloseModalPopup() {
        setShowModalPopup(false);
    }

    return (
        <>
            <button className={`add-to-cart-button ${!user && 'disabled'}`} onClick={handleClick} disabled={!user}>
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