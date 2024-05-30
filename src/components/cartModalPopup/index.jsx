import React from 'react';
import './modal.css';

const Modal = ({ title, handleCloseModalPopup }) => {


    function handleViewCart() {
        handleCloseModalPopup();
    }
    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-icon-container'>
                    <span onClick={handleCloseModalPopup} className='close-modal-icon'>&times;</span>
                </div>
                <div className='body'>
                    <div>
                        <p>{title} added to cart!</p>
                        <p onClick={handleViewCart} >View Items in Cart</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;