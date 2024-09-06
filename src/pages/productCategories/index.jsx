import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';


export default function GetProductCategories() {
    // Initialize hooks and state variables
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch product categories from the API
    async function fetchProductCategories() {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`/api/products/categories`);

            const data = await res.json();
            if (data.success) {
                setCategoryList(data.categories);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // Function to fetch products by category from the API
    async function fetchProducts(category) {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`/api/products/category/${category}`);

            const data = await res.json();
            if (data.success) {
                const header = `Viewing ${category}`; // Header to display the current category
                navigate(`/products/${category}`, { state: { products: data.products, header } });  // Navigate to Products component with the fetched products

            } else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // Fetch product categories on component mount
    useEffect(() => {
        fetchProductCategories();
    }, []);

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <ul className='product-categories'>
            {
                categoryList.map((category, index) => (
                    <li key={index} onClick={() => fetchProducts(category)} >{category}</li>
                ))
            }
        </ul >
    )
}