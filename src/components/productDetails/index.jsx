import Button from '../button/index';
import './styles.css';

export default function productDataDetails({ returnToProducts, productData }) {

    console.log(productData);

    return (
        <div className='product-details-container'>
            {/* <button className='return-to-products-button' onClick={returnToProducts}>Return to Products</button> */}
            <Button onClick={returnToProducts} buttonText={'Return to Products'} />
            <div
                className='productData'
            >
                <img
                    src={productData.thumbnail}
                    alt={productData.title}
                />
                <p onClick={() => handleClick(productData)} className='title'>{productData.title}</p>
                <p>Availability: <span className={
                    `availability ${productData.availabilityStatus === 'In Stock'
                        ? 'in-stock'
                        : 'out-of-stock'
                    }`
                }>
                    {productData.availabilityStatus}
                </span></p>
                {
                    productData.discountPercentage > 7 // Everything is discounted. Make it seem more realistic by showing some items without discount.
                        ? <p>
                            <span className='current-price'>
                                ${(productData.price - (productData.price * (productData.discountPercentage / 100))).toFixed(2)}</span> <span className='original-price'>{productData.price}</span><span className='add-to-cart'><img src='src/img/plus-circle.svg' /></span></p>
                        : <p><span className='current-price'>{productData.price}</span><span className='add-to-cart'><img src='src/img/plus-circle.svg' /></span></p>
                }
            </div>
        </div>
    )
}