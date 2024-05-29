import './styles.css';

export default function Button({ onClick, buttonText }) {

    return (
        <button className='button' onClick={onClick}>{buttonText}</button>
    )
}