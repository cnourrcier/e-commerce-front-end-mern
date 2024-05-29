import Home from '../home/index';
import Search from '../search/index';
import GetProductCategories from '../getProductCategories/index';
import Cart from '../cart/index';
import Login from '../login/index';

const tabs = [
    {
        label: 'Home',
        content: <Home />,
        imgSrc: 'src/img/home.svg'
    },
    {
        label: 'Shop',
        content: <GetProductCategories url={'https://dummyjson.com/products/'} categories={'category-list'} />,
        imgSrc: 'src/img/shopping-bag.svg'
    },
    {
        label: 'Search',
        content: <Search url={'https://dummyjson.com/products/search'} />,
        imgSrc: 'src/img/search.svg'
    },
    {
        label: 'Cart',
        content: <Cart />,
        imgSrc: 'src/img/shopping-cart.svg'
    },
    {
        label: 'Login',
        content: <Login />,
        imgSrc: 'src/img/log-in.svg'
    }

]

export default tabs;