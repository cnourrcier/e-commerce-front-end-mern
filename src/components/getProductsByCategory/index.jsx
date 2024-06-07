import { useEffect, useState } from "react";
import Products from "../products/index";
import { useParams } from "react-router-dom";

export default function GetProductsByCategory() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchProducts() {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`/api/products/category/${category}`);
            if (!res.ok) {
                throw new Error('Error occurred. Please try again.');
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