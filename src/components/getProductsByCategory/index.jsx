import { useEffect, useState } from "react";
import './styles.css';


export default function GetProductsByCategory({ url, category }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchProducts() {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`${url}/category/${category}`);
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

    console.log(products)
    return (
        <div className='load-more-products-container'>
            <h1 className='load-more-products-header'>Viewing {category}</h1>
            <div className='products-container'>
                {
                    products?.length
                    && products.map(product => (
                        <div
                            key={product.id}
                            className='product'>
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                            />
                            <p>{product.title}</p>
                            <p>Available: {product.availabilityStatus}</p>
                            <p>Price: ${product.price}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}