import { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [dropdown, setDropdown] = useState(false);

    function handleToggleMenu() {
        setDropdown(!dropdown);
    }

    return (
        <>
            <div className='row-one'>
                <div className='box box-one'>
                    <a href='https://github.com/cnourrcier' target='_blank'><img src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/src/img/lorem-lorem-1.svg`} alt='' /></a>
                </div>
                <div className='box box-one-and-half'>
                    <span>Cardinal Nest <br />Treasures</span>
                </div>
                <div className='box box-two'>
                    <Link to="/" className='tab'>
                        <img src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/src/img/home.svg`} />
                        Home
                    </Link>
                    <Link to="/shop" className='tab'>
                        <img src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/src/img/shopping-bag.svg`} />
                        Shop
                    </Link>
                    <Link to="/search" className='tab'>
                        <img src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/src/img/search.svg`} />
                        Search
                    </Link>
                    <Link to="/cart" className='tab'>
                        <img src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/src/img/shopping-cart.svg`} />
                        Cart
                    </Link>
                    <Link to="/login" className='tab'>
                        <img src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/src/img/log-in.svg`} />
                        Login
                    </Link>
                </div>
                <div className='box box-three'>
                    <div onClick={handleToggleMenu} className='hamburger-menu'>
                        <div className='bar'></div>
                        <div className='bar'></div>
                        <div className='bar'></div>
                    </div>
                </div>
            </div>
            <div className={`drop-down ${dropdown ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/" className='tab' onClick={handleToggleMenu}>HOME</Link></li>
                    <li><Link to="/shop" className='tab' onClick={handleToggleMenu}>SHOP</Link></li>
                    <li><Link to="/search" className='tab' onClick={handleToggleMenu}>SEARCH</Link></li>
                    <li><Link to="/cart" className='tab' onClick={handleToggleMenu}>CART</Link></li>
                    <li><Link to="/login" className='tab' onClick={handleToggleMenu}>LOGIN</Link></li>
                    <li><Link to="/signup" className='tab' onClick={handleToggleMenu}>SIGNUP</Link></li>
                </ul>
            </div>

        </>
    )
}