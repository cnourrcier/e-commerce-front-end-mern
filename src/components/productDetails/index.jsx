import { useState } from 'react';
import Button from '../button/index';
import AddToCartButton from '../addToCartButton';
import { numberWithCommas } from '../../utils/format';
import './styles.css';

export default function productDetails({ returnToProducts, productData }) {
    const [showReviews, setShowReviews] = useState(false);

    return (
        <div className='product-details-container'>
            <Button onClick={returnToProducts} buttonText={'Return to Products'} />
            <div
                className='product-details'
            >
                <img
                    src={productData.thumbnail}
                    alt={productData.title}
                />
                <p className='product-details-title'>{productData.title}</p>
                <p className='product-details-availability'>Availability: <span className={
                    `product-details-availability ${productData.availabilityStatus === 'In Stock'
                        ? 'in-stock'
                        : 'out-of-stock'
                    }`
                }>
                    {productData.availabilityStatus}
                </span></p>
                <p className='product-details-rating'>rating: <span className={`${productData.rating >= 3.5 ? 'product-rating-good' : 'product-rating-okay'}`}>{productData.rating}</span></p> {/* replace with star rating */}
                <div className={`product-reviews-container ${showReviews ? 'open' : 'product-reviews-container'}`}>
                    <p onClick={() => setShowReviews(!showReviews)}><span className='show-product-reviews'><span className='product-reviews-title'>reviews: </span>{productData.reviews.length}</span></p>
                    <ul className='product-reviews-list'>
                        {
                            showReviews && productData.reviews.map((review, index) => <li key={index}><p><span className='product-review-rating-title'>rating: </span><span className='product-review-rating'>{review.rating}</span></p><p className='product-review-comment'>{review.comment}</p></li>)
                        }
                    </ul>
                </div>
                {
                    productData.discountPercentage > 7 // Everything is discounted. Make it seem more realistic by showing some items without discount.
                        ? <p>
                            <span className='product-current-price'>
                                ${numberWithCommas((productData.price - (productData.price * (productData.discountPercentage / 100))).toFixed(2))}
                            </span>
                            <span className='product-original-price'>{numberWithCommas(productData.price)}
                            </span>
                        </p>
                        : <p>
                            <span className='product-current-price'>
                                ${numberWithCommas(productData.price)}
                            </span>
                        </p>
                }
                <p>{productData.description}</p>
                <AddToCartButton customStyles={'product-details-button'} product={productData} />
            </div>
        </div>
    )
}