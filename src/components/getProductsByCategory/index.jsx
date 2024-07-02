import { useEffect, useState } from "react";
import Products from "../products/index";
import { useParams } from "react-router-dom";

export default function GetProductsByCategory() {
    const { category } = useParams(); // Retrieve the category parameter from the URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch products by category from the API
    async function fetchProducts() {
        try {
            setLoading(true); // Set loading to true before fetching
            setError(null); // Reset error state

            const res = await fetch(`/api/products/category/${category}`); // Fetch products by category from the API
            if (!res.ok) {
                throw new Error('Error occurred. Please try again.'); // Handle HTTP errors
            }
            const data = await res.json(); // Parse the JSON response
            setProducts(data.products); // Update the products state
        } catch (err) {
            setError(err.message); // Set error message if fetching fails
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    }

    // Fetch products when the category changes
    useEffect(() => {
        fetchProducts();
    }, [category])

    if (loading) return <div>Loading...</div> // Render loading message if data is being fetched
    if (error) return <div>{error}</div> // Render error message if there was an error fetching data

    const header = `Viewing ${category}`; // Header to display the current category

    return (
        <Products products={products} header={header} /> // Render the Products component with fetched products and header
    )
}