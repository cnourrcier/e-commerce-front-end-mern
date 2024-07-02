import { useEffect, useState } from "react";
import Products from '../products/index';
import './styles.css';


export default function Search() {
    const [products, setProducts] = useState([]);
    const [text, setText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch products based on the search term
    async function fetchProducts() {
        try {
            setLoading(true); // Set loading to true before fetching data
            setError(null); // Reset error state

            // Fetch products from the server
            const res = await fetch(`/api/products/search?q=${searchTerm}`);

            if (!res.ok) {
                throw new Error('Error Occurred. Please try again.'); // Throw error if bad response
            }
            const data = await res.json(); // Parse the JSON data from the response
            setProducts(data.products); // Set the products state with the fetched data
        } catch (err) {
            setError(err.message); // Set the error state with the caught error message
        } finally {
            setLoading(false); // Set loading to false after the fetch is complete
        }
    }

    // Function to handle the search button click
    function handleClick() {
        setSearchTerm(text); // Set the searchTerm state with the current text value
        setText(''); // Clear the text input
    }

    // Fetch products when the searchTerm changes
    useEffect(() => {
        if (searchTerm) {
            fetchProducts();
        }
    }, [searchTerm]);

    if (loading) return <div>Loading...</div> // Display loading indicator while fetching data
    if (error) return <div>{error}</div> // Display error message if any error occurs

    const header = `Viewing products related to ${searchTerm}`; // Header to display the search term

    return (
        <>
            <div className='search-bar-container'>
                <input
                    className='search-input'
                    type="text"
                    value={text}
                    id="search"
                    placeholder="Enter your search here"
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    className='search-button'
                    onClick={handleClick}>Search
                </button>
            </div>
            {
                searchTerm && <Products products={products} header={header} />
            }
        </>
    )
}