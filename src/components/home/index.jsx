import { useState } from 'react';
import './styles.css';

const featuredProducts = [
  { id: 1, name: 'Wireless Earbuds', price: 79.99, image: 'https://via.placeholder.com/200x200.png?text=Placeholder' },
  { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://via.placeholder.com/200x200.png?text=Placeholder' },
  { id: 3, name: 'Laptop', price: 899.99, image: 'https://via.placeholder.com/200x200.png?text=Placeholder' },
  { id: 4, name: 'Smartphone', price: 699.99, image: 'https://via.placeholder.com/200x200.png?text=Placeholder' },
];

export default function Home() {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <main>
      <div className='sale-banner'>
        <h2>Summer Sale!</h2>
        <p>Get up to 50% off on selected items. Limited time offer!</p>
      </div>

      <section>
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
              <button className="add-to-cart-btn">Add to Cart</button>
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