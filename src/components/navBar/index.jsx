import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import useLogout from '../../hooks/useLogout';
import Search from '../search';
import './styles.css';

export default function NavBar() {
    const { user } = useContext(AuthContext);
    const [mainMenuDropdown, setMainMenuDropdown] = useState(false);
    const [accountMenuDropdown, setAccountMenuDropdown] = useState(false);

    const logout = useLogout();

    function handleToggleMainMenuDropdown() {
        setMainMenuDropdown(prevState => !prevState);
    }

    function handleToggleAccountMenuDropdown() {
        setAccountMenuDropdown(prevState => !prevState);
    }

    function handleLogout() {
        logout();
        setAccountMenuDropdown(false);
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
                <div className='main-menu-tabs-container'>
                    <Link to="/shop" className='tab'>
                        <img src={`/img/shopping-bag.svg`} />
                    </Link>
                    <Link to="/cart" className='tab'>
                        <img src={`/img/shopping-cart.svg`} />
                    </Link>
                    <div className='account-menu-dropdown-container'>
                        <div onClick={handleToggleAccountMenuDropdown} className='tab'>
                            <img src={`/img/log-in.svg`} />
                        </div>
                        <div className={`account-menu-dropdown ${accountMenuDropdown ? 'show' : ''}`}>
                            <ul>
                                {!user
                                    ? <>
                                        <li onClick={handleToggleAccountMenuDropdown}><Link to="/login" className='tab dropdownTab' >LOGIN</Link></li>
                                        <li onClick={handleToggleAccountMenuDropdown}><Link to="/signup" className='tab dropdownTab'>SIGNUP</Link></li>
                                    </>
                                    : <>
                                        <li onClick={handleToggleAccountMenuDropdown}><Link to="/profile" className='tab dropdownTab' >PROFILE</Link></li>
                                        <li onClick={handleLogout}><Link to="/login" className='tab dropdownTab'>LOGOUT</Link></li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='main-menu-dropdown-container'>
                    <div onClick={handleToggleMainMenuDropdown} className='main-menu-dropdown-icon'>
                        <div className='main-menu-dropdown-icon-bar'></div>
                        <div className='main-menu-dropdown-icon-bar'></div>
                        <div className='main-menu-dropdown-icon-bar'></div>
                    </div>
                    <div className={`main-menu-dropdown ${mainMenuDropdown ? 'show' : ''}`}>
                        <ul>
                            <li onClick={handleToggleMainMenuDropdown}><Link to="/shop" className='tab dropdownTab'>SHOP</Link></li>
                            <li onClick={handleToggleMainMenuDropdown}><Link to="/cart" className='tab dropdownTab' >CART</Link></li>
                            {!user
                                ? <>
                                    <li onClick={handleToggleMainMenuDropdown}><Link to="/login" className='tab dropdownTab' >LOGIN</Link></li>
                                    <li onClick={handleToggleMainMenuDropdown}><Link to="/signup" className='tab dropdownTab'>SIGNUP</Link></li>
                                </>
                                : <>
                                    <li onClick={handleToggleMainMenuDropdown}><Link to="/profile" className='tab dropdownTab' >PROFILE</Link></li>
                                    <li onClick={handleLogout}><Link to="/login" className='tab dropdownTab'>LOGOUT</Link></li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>


        </>
    )
}