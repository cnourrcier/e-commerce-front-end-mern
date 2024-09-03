import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [text, setText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Function to fetch products based on the search term
    async function fetchProducts() {
        try {
            setLoading(true);
            setError(null);

            // Fetch products from the server
            const res = await fetch(`/api/products/search?q=${searchTerm}`);
            const data = await res.json();

            if (data.success) {
                const header = `Viewing products related to ${searchTerm}`; // Header to display the search term
                navigate(`/products/${searchTerm}`, { state: { products: data.products, header } });                 // Navigate to Products component with the fetched products

            } else {
                setError(data.message); // Throw error if bad response
            }
        } catch (err) {
            setError(err); // Set the error state with the caught error message
        } finally {
            setLoading(false); // Set loading to false after the fetch is complete
        }
    }

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

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <>
            <input
                type="text"
                value={text}
                id="search"
                placeholder="Search..."
                onChange={(e) => setText(e.target.value)}
            />
            <img
                src={`/img/search.svg`}
                onClick={handleClick}
            />
        </>
    );
}