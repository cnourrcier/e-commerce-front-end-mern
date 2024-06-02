import React, { useContext, useState } from 'react';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import Modal from '../cartModalPopup/index';
import './styles.css';


export default function AddToCartButton({ product }) {
    const { addProduct } = useContext(ShoppingCartContext);
    const [showModalPopup, setShowModalPopup] = useState(false);

    function handleClick() {
        addProduct(product);
        setShowModalPopup(true);
    };

    function handleCloseModalPopup() {
        setShowModalPopup(false);
    }

    return (
        <>
            <button className='add-to-cart-button' onClick={handleClick}>
                Add to Cart <img className='add-to-cart-icon' src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/src/img/plus-circle.svg`} />
            </button>
            {showModalPopup && <Modal
                title={product.title}
                handleCloseModalPopup={handleCloseModalPopup}
            />
            }
        </>
    );
};