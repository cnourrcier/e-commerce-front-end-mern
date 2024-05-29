import { useEffect, useState } from "react";
import GetProductsByCategory from "../getProductsByCategory";
import './styles.css';


export default function GetProductCategories({ url, categories, resetCategory }) {
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchProductCategories() {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`${url}/${categories}`);
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

    useEffect(() => {
        if (resetCategory) {
            setCategory(null); // Reset the category when the reset flag is true
        }
    }, [resetCategory]);


    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <>
            {
                !category
                    ? <ul className='product-categories'>
                        {
                            categoryList.map((category, index) => (
                                <li key={index} onClick={() => setCategory(category)} >{category}</li>
                            ))
                        }
                    </ul >
                    : <GetProductsByCategory url={url} category={category} />
            }
        </>
    )
}