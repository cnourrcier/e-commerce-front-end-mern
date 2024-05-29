import React from 'react';

const Modal = ({ id, header, body, footer, handleCloseModalPopup }) => {
    return (
        <div id={id || 'Modal'} className='modal'>
            <div className='modal-content'>
                <div className='modal-icon-container'>
                    <span onClick={handleCloseModalPopup} className='close-modal-icon'>&times;</span>
                </div>
                <div className='header'>
                    <h2>{header}</h2>
                </div>
                <div className='body'>
                    {body}
                </div>
                <div className='footer'>
                    {
                        <h2>{footer}</h2>
                    }
                </div>
            </div>
        </div>
    )
}

export default Modal;