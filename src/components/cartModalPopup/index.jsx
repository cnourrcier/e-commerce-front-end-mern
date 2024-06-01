import { useNavigate } from 'react-router-dom';
import './modal.css';

const Modal = ({ title, handleCloseModalPopup }) => {
    const navigate = useNavigate();

    function handleViewCart() {
        handleCloseModalPopup();
        navigate('/cart');
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