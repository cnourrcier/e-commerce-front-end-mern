import { useState } from 'react';
import tabs from './tabs';
import Content from '../content';
import './styles.css';

export default function NavBar() {
    const [dropdown, setDropdown] = useState(false);
    const [currentSelected, setCurrentSelected] = useState(0);
    const [resetCategory, setResetCategory] = useState(false);

    function handleToggleMenu() {
        setDropdown(!dropdown);
    }

    function handleSelect(index) {
        if (tabs[index].label === 'Shop') {
            setResetCategory(true); // Reset category state in getProductCategory
        }
        setCurrentSelected(index);
        setDropdown(false);
    }

    return (
        <>
            <div className='row-one'>
                <div className='box box-one'>
                    <a href='https://github.com/cnourrcier' target='_blank'><img src='src/img/lorem-lorem-1.svg' alt='' /></a>
                </div>
                <div className='box box-one-and-half'>
                    <span>Cardinal Nest <br />Treasures</span>
                </div>
                <div className='box box-two'>
                    {
                        tabs.map((tab, index) => (
                            <a
                                className='tab'
                                key={index}
                                onClick={() => handleSelect(index)}
                            >
                                <img src={tab.imgSrc} />
                                {tab.label}
                            </a>
                        ))
                    }
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
                    {
                        tabs.map((tab, index) => (
                            <li key={index}><a className='tab' onClick={() => handleSelect(index)}>{tab.label.toUpperCase()}</a></li>
                        ))
                    }
                </ul>
            </div>
            <Content tabs={tabs} currentSelected={currentSelected} resetCategory={resetCategory} setResetCategory={setResetCategory} />
        </>
    )
}