import React, { useState } from 'react';
import Modal from './Modal';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import './modal.css';


const CartModalButton = () => {
    const [showModalPopup, setShowModalPopup] = useState(false);

    function handleOpenModalPopup() {
        setShowModalPopup(true);
    }

    function handleCloseModalPopup() {
        setShowModalPopup(false);
    }

    return (
        <>
            <button className='open-modal-button' onClick={handleOpenModalPopup}>Add to cart <img className='open-modal-icon' src='src/img/plus-circle.svg' /></button>
            {showModalPopup && <Modal
                id={'custom-id'}
                handleCloseModalPopup={handleCloseModalPopup}
                header={<ModalHeader />}
                body={<ModalBody />}
                footer={<ModalFooter />}
            />
            }
        </>
    )
}

export default CartModalButton;