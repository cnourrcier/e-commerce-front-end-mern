import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Search from '../search';
import useLogout from '../../hooks/useLogout';
import './styles.css';

export default function NavBar() {
    const { user } = useContext(AuthContext);
    const [dropdown, setDropdown] = useState(false);

    const logout = useLogout();

    function handleToggleMenu() {
        setDropdown(!dropdown);
    }

    function handleLogout() {
        logout();
        handleToggleMenu();
    }

    return (
        <>
            <div className='navbar-container'>
                <div className='logo-container'>
                    <Link to='/'><img src={`/img/logo.svg`} /></Link>
                </div>
                <div className='name-container'>
                    <span>Cardinal <br />Finds</span>
                </div>
                <div className="search-container">
                    <Search />
                </div>
                <div className='tabs-container'>
                    <Link to="/shop" className='tab'>
                        <img src={`/img/shopping-bag.svg`} />
                    </Link>
                    <Link to="/cart" className='tab'>
                        <img src={`/img/shopping-cart.svg`} />
                    </Link>
                    {!user
                        ? <>
                            <Link to="/login" className='tab'>
                                <img src={`/img/log-in.svg`} />
                            </Link>
                        </>
                        : <Link to="/profile" className='tab'>
                            <img src={`/img/signup.svg`} />
                        </Link>
                    }
                </div>
                <div className='hamburger-menu-container'>
                    <div onClick={handleToggleMenu} className='hamburger-menu'>
                        <div className='bar'></div>
                        <div className='bar'></div>
                        <div className='bar'></div>
                    </div>
                </div>
            </div>
            <div className={`dropdown ${dropdown ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/shop" className='tab dropdownTab' onClick={handleToggleMenu}>SHOP</Link></li>
                    <li><Link to="/cart" className='tab dropdownTab' onClick={handleToggleMenu}>CART</Link></li>
                    {!user
                        ? <>
                            <li><Link to="/login" className='tab dropdownTab' onClick={handleToggleMenu}>LOGIN</Link></li>
                            <li><Link to="/signup" className='tab dropdownTab' onClick={handleToggleMenu}>SIGNUP</Link></li>
                        </>
                        : <>
                            <li><Link to="/profile" className='tab dropdownTab' onClick={handleToggleMenu}>PROFILE</Link></li>
                            <li><Link to="/login" className='tab dropdownTab' onClick={handleLogout}>LOGOUT</Link></li>
                        </>
                    }
                </ul>
            </div>

        </>
    )
}