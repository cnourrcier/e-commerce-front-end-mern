import { useEffect, useState } from "react";
import Products from '../products/index';
import './styles.css';


export default function Search() {
    const [products, setProducts] = useState([]);
    const [text, setText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    apiUrl = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_PROD;

    async function fetchProducts() {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`${apiUrl}/api/products/search?q=${searchTerm}`);

            if (!res.ok) {
                throw new Error('Error Occurred. Please try again.');
            }
            const data = await res.json();
            setProducts(data.products);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleClick() {
        setSearchTerm(text);
        setText('');
    }

    useEffect(() => {
        if (searchTerm) {
            fetchProducts();
        }
    }, [searchTerm]);

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    const header = `Viewing products related to ${searchTerm}`;

    return (
        <>
            <div className='search-bar-container'>
                <input className='search-input' value={text} type="text" id="search" onChange={(e) => setText(e.target.value)} />
                <button className='search-button' onClick={handleClick}>Search</button>
            </div>
            {
                searchTerm && <Products products={products} header={header} />
            }
        </>
    )
}