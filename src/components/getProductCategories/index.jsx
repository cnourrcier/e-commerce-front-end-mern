import { useEffect, useState } from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";


export default function GetProductCategories({ resetCategory }) {
    // Initialize hooks and state variables
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch product categories from the API
    async function fetchProductCategories() {
        try {
            setLoading(true); // Set loading to true before fetching
            setError(null); // Reset error state

            const res = await fetch(`/api/products/categories`); // Fetch categories from the API

            const data = await res.json(); // Parse the JSON response
            if (data.success) {
                setCategoryList(data.categories); // Update the category list state
            } else {
                setError(data.message); // set error message
            }
        } catch (err) {
            setError(err.message); // Set error message if fetching fails
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    }

    // Fetch product categories on component mount
    useEffect(() => {
        fetchProductCategories();
    }, []);

    // Reset the selected category when the reset flag is true
    useEffect(() => {
        if (resetCategory) {
            setCategory(null); // Reset the category state
        }
    }, [resetCategory]);

    if (loading) return <div>Loading...</div> // Render loading message if data is being fetched
    if (error) return <div>{error}</div> // Render error message if there was an error fetching data


    return (
        <ul className='product-categories'>
            {
                categoryList.map((category, index) => (
                    <li key={index} onClick={() => setCategory(navigate(`/shop/${category}`))} >{category}</li>
                ))
            }
        </ul >
    )
}