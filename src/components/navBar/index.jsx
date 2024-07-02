import { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export default function NavBar() {
    // State to manage the dropdown menu visibility
    const [dropdown, setDropdown] = useState(false);

    // Function to toggle the dropdown menu
    function handleToggleMenu() {
        setDropdown(!dropdown);
    }

    return (
        <>
            <div className='navbar-container'>
                <div className='subcontainer subcontainer-one'>
                    <a href='https://github.com/cnourrcier' target='_blank'><img src={`/img/lorem-lorem-1.svg`} alt='' /></a>
                </div>
                <div className='subcontainer subcontainer-one-and-half'>
                    <span>Cardinal <br />Finds</span>
                </div>
                <div className='subcontainer subcontainer-two'>
                    <Link to="/" className='tab'>
                        <img src={`/img/home.svg`} />
                        Home
                    </Link>
                    <div className='tab-separator'></div>
                    <Link to="/shop" className='tab'>
                        <img src={`/img/shopping-bag.svg`} />
                        Shop
                    </Link>
                    <div className='tab-separator'></div>
                    <Link to="/search" className='tab'>
                        <img src={`/img/search.svg`} />
                        Search
                    </Link>
                    <div className='tab-separator'></div>
                    <Link to="/cart" className='tab'>
                        <img src={`/img/shopping-cart.svg`} />
                        Cart
                    </Link>
                    <div className='tab-separator'></div>
                    <Link to="/login" className='tab'>
                        <img src={`/img/log-in.svg`} />
                        Login
                    </Link>
                    <div className='tab-separator'></div>
                    <Link to="/signup" className='tab'>
                        <img src={`/img/signup.svg`} />
                        Signup
                    </Link>
                </div>
                <div className='subcontainer subcontainer-three'>
                    <div onClick={handleToggleMenu} className='hamburger-menu'>
                        <div className='bar'></div>
                        <div className='bar'></div>
                        <div className='bar'></div>
                    </div>
                </div>
            </div>
            <div className={`drop-down ${dropdown ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/" className='tab dropdown' onClick={handleToggleMenu}>HOME</Link></li>
                    <li><Link to="/shop" className='tab dropdown' onClick={handleToggleMenu}>SHOP</Link></li>
                    <li><Link to="/search" className='tab dropdown' onClick={handleToggleMenu}>SEARCH</Link></li>
                    <li><Link to="/cart" className='tab dropdown' onClick={handleToggleMenu}>CART</Link></li>
                    <li><Link to="/login" className='tab dropdown' onClick={handleToggleMenu}>LOGIN</Link></li>
                    <li><Link to="/signup" className='tab dropdown' onClick={handleToggleMenu}>SIGNUP</Link></li>
                </ul>
            </div>

        </>
    )
}