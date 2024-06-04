import { useEffect, useState } from "react";
import Products from "../products/index";

export default function GetProductsByCategory({ category }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchProducts() {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/products/category/${category}`);
            if (!res.ok) {
                throw new Error('Error occured. Please try again.');
            }
            const data = await res.json();
            setProducts(data.products);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [category])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    const header = `Viewing ${category}`;

    return (
        <Products products={products} header={header} />
    )
}