import './styles.css';

export default function ProductCard({ product }) {

    return (
        <div
            key={product.id}
            className='product'>
            <img
                src={product.thumbnail}
                alt={product.title}
            />
            <p className='title'>{product.title}</p>
            <p>Availability: <span className={`availability ${product.availabilityStatus === 'In Stock' ? 'in-stock' : 'out-of-stock'}`}>{product.availabilityStatus}</span></p>
            {
                product.discountPercentage > 7
                    ? <p><span className='current-price'>${(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}</span> <span className='original-price'>{product.price}</span><span className='add-to-cart'><img src='src/img/plus-circle.svg' /></span></p>
                    : <p><span className='current-price'>{product.price}</span><span className='add-to-cart'><img src='src/img/plus-circle.svg' /></span></p>
            }
        </div>
    )
}