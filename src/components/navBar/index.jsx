import { useState } from "react";
import tabs from './tabs';
import Content from "../content";
import './styles.css';

export default function NavBar() {
    const [dropdown, setDropdown] = useState(false);
    const [currentSelected, setCurrentSelected] = useState(0);

    function handleToggleMenu() {
        setDropdown(!dropdown);
    }

    function handleSelect(index) {
        setCurrentSelected(index);
        setDropdown(false);
    }

    return (
        <>
            <div className='row-one'>
                <div className='box box-one'>
                    <img src="./lorem-lorem-1.svg" alt="" />
                </div>
                <div className='box box-one-and-half'>
                    <span>Cardinal Nest <br />Treasures</span>
                </div>
                <div className='box box-two'>
                    {
                        tabs.map((tab, index) => (
                            <a key={index} onClick={() => handleSelect(index)}>{tab.label}</a>
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
                            <li key={index}><a onClick={() => handleSelect(index)} >{tab.label.toUpperCase()}</a></li>
                        ))
                    }
                </ul>
            </div>
            <Content tabs={tabs} currentSelected={currentSelected} />
        </>
    )
}