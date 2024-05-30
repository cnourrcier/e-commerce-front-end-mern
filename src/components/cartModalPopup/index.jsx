import React, { useContext } from 'react';
import './modal.css';
import { CurrentTabContext } from '../../contexts/CurrentTabContext';
import Button from '../button/index';

const Modal = ({ title, handleCloseModalPopup }) => {
    const { setCurrentSelected } = useContext(CurrentTabContext);


    function handleViewCart() {
        handleCloseModalPopup();
        setCurrentSelected(3);
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-icon-container'>
                    <span onClick={handleCloseModalPopup} className='close-modal-icon'>&times;</span>
                </div>
                <div className='body'>
                        <p>{title} added to cart!</p>
                        <p onClick={handleViewCart} className='view-cart-items'>View Items in Cart</p>
                </div>
            </div>
        </div>
    )
}

export default Modal;