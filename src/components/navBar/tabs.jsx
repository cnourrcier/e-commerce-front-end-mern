import Home from '../home/index';
import About from '../about/index';
import LoadMoreProducts from '../loadMoreProducts/index';
import Cart from '../cart/index';

const tabs = [
    {
        label: 'Home',
        content: <Home />
    },
    {
        label: 'Shop',
        content: <LoadMoreProducts url={'https://dummyjson.com/products'} limit={20} />
    },
    {
        label: 'About',
        content: <About />
    },
    {
        label: 'Cart',
        content: <Cart />
    },
]

export default tabs;