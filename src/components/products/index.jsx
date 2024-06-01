import { useState } from 'react';
import ProductCard from '../productCard/index';
import ProductDetails from '../productDetails/index';
import './styles.css';

export default function Products({ products, header }) {
    const [viewProductDetails, setViewProductDetails] = useState(false);
    const [productData, setProductData] = useState({});

    function handleViewProductDetails(product) {
        setViewProductDetails(true);
        setProductData(product);
    }

    function handleReturnToProducts() {
        setViewProductDetails(false);
        setProductData({});
    }

    return (
        <>
            {
                !viewProductDetails
                    ? < div className='products-container' >
                        <h1 className='products-header'>{header}</h1>
                        <div className='products-grid'>
                            {
                                products?.length
                                && products.map(product => (
                                    <ProductCard key={product.id} product={product} viewProductDetails={handleViewProductDetails} />
                                ))
                            }
                        </div>
                    </div >
                    : <ProductDetails returnToProducts={handleReturnToProducts} productData={productData} />
            }
        </>
    )
}