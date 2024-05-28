import { useEffect, useState } from "react";
import './styles.css';

export default function GetProductCategories({ url }) {
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchProductCategories() {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Error occured. Please try again.');
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
    }, [url]);


    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    console.log(categoryList);

    return (
        <ul className='project-categories-dropdown'>
            {
                categoryList.map((category, index) => (
                    <li key={index} ><a className='category'>{category}</a></li>
                ))
            }
        </ul >
    )
}