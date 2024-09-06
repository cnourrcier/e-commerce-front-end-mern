import { useEffect, useState } from 'react';
import './styles.css';
import AddToCartButton from '../../components/addToCartButton';

const featuredProductIds = [107, 106, 80, 109];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const productPromises = featuredProductIds.map(async (productId) => {
          const res = await fetch(`/api/products/product/${productId}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch product with id ${productId}`);
          }
          return res.json();
        });
        // Wait for all fetches to complete
        const products = await Promise.all(productPromises);
        setFeaturedProducts(products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <main>
      <div className='sale-banner'>
        <h2>Summer Sale!</h2>
        <p>Get up to 50% off on selected items. Limited time offer!</p>
      </div>

      <section className='product-grid-section'>
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div
              key={product.product[0].id}
              className="product-card"
              onMouseEnter={() => setHoveredProduct(product.product[0].id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <img src={product.product[0].thumbnail} alt={product.product[0].title} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{product.product[0].title}</h3>
                <p className="product-price">${product.product[0].price}</p>
              </div>
              <AddToCartButton product={product.product[0]} />
            </div>
          ))}
        </div>
      </section>

      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="benefits">
          <div className="benefit">
            <h3>Free Shipping</h3>
            <p>On orders over $50</p>
          </div>
          <div className="benefit">
            <h3>24/7 Support</h3>
            <p>Always here to help</p>
          </div>
          <div className="benefit">
            <h3>Money-Back Guarantee</h3>
            <p>30-day return policy</p>
          </div>
        </div>
      </section>
    </main>
  );
}