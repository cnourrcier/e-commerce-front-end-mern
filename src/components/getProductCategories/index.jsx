import { useEffect, useState } from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";


export default function GetProductCategories({ resetCategory }) {
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    apiUrl = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_PROD;


    async function fetchProductCategories() {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`${apiUrl}/api/products/categories`);
            if (!res.ok) {
                throw new Error('Error occurred. Please try again.');
            }
            const data = await res.json();
            setCategoryList(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProductCategories();
    }, []);

    useEffect(() => {
        if (resetCategory) {
            setCategory(null); // Reset the category when the reset flag is true
        }
    }, [resetCategory]);


    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

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