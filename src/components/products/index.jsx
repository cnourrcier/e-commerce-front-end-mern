import ProductCard from '../productCard/index';
import './styles.css';

export default function Products({ products, header }) {

    return (
        <div className='products-container'>
            <h1 className='products-header'>{header}</h1>
            <div className='products-grid'>
                {
                    products?.length
                    && products.map(product => (
                        <ProductCard product={product} />
                    ))
                }
            </div>
        </div>
    )
}