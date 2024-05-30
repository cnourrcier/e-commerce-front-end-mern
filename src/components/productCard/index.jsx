import AddToCartButton from '../addToCartButton';
import './styles.css';

export default function ProductCard({ product, viewProductDetails }) {

    return (
        <div
            key={product.id}
            className='product'>
            <img
                src={product.thumbnail}
                alt={product.title}
            />
            <p onClick={() => viewProductDetails(product)} className='title'>{product.title}</p>
            <p>Availability: <span className={
                `availability ${product.availabilityStatus === 'In Stock'
                    ? 'in-stock'
                    : 'out-of-stock'
                }`
            }>
                {product.availabilityStatus}
            </span></p>
            {
                product.discountPercentage > 7 // Everything is discounted. Make it seem more realistic by showing some items without discount.
                    ? <p>
                        <span className='current-price'>
                            ${(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}</span> <span className='original-price'>{product.price}</span></p>
                    : <p><span className='current-price'>${product.price}</span></p>
            }
            <AddToCartButton product={product} />
        </div>
    )
}