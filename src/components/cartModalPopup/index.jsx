import { useNavigate } from 'react-router-dom';
import './styles.css';

const Modal = ({ title, handleCloseModalPopup }) => {
    const navigate = useNavigate();

    // Function to handle the view cart action
    function handleViewCart() {
        handleCloseModalPopup(); // Close the modal popup
        navigate('/cart'); // Navigate to the cart page
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-icon-container'>
                    <span onClick={handleCloseModalPopup} className='close-modal-icon'>&times;</span>
                </div>
                <div className='modal-text'>
                    <p>{title} added to cart!</p>
                    <p onClick={handleViewCart} className='view-cart-items'>View Items in Cart</p>
                </div>
            </div>
        </div>
    )
}

export default Modal;