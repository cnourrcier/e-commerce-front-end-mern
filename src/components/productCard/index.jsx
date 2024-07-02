import AddToCartButton from '../addToCartButton';
import { numberWithCommas } from '../../utils/format';
import './styles.css';

export default function ProductCard({ product, viewProductDetails }) {

    return (
        <div
            key={product.id}
            className='product'>
            {/* Display product thumbnail */}
            <img
                src={product.thumbnail}
                alt={product.title}
            />
            {/* Display product title and enable viewing product details on click */}
            <p onClick={() => viewProductDetails(product)} className='title'>{product.title}</p>
            {/* Display product availability status with conditional styling */}
            <p>Availability: <span className={
                `availability ${product.availabilityStatus === 'In Stock'
                    ? 'in-stock'
                    : 'out-of-stock'
                }`
            }>
                {product.availabilityStatus}
            </span></p>
            {/* Display product price, showing discount if applicable */}
            {
                product.discountPercentage > 7 // Everything is discounted. Make it seem more realistic by showing some items without discount.
                    ? <p>
                        <span className='current-price'>
                            ${numberWithCommas((product.price - (product.price * (product.discountPercentage / 100))).toFixed(2))}</span> <span className='original-price'>{numberWithCommas(product.price)}</span></p>
                    : <p><span className='current-price'>${numberWithCommas(product.price)}</span></p>
            }
            <AddToCartButton product={product} />
        </div>
    )
}