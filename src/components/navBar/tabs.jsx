import Home from '../home/index';
import About from '../about/index';
import LoadMoreProducts from '../loadMoreProducts/index';
import Cart from '../cart/index';
import Login from '../login/index';
// import Signup from '../signup/index';

const tabs = [
    {
        label: 'Home',
        content: <Home />,
        imgSrc: 'src/img/home.svg'
    },
    {
        label: 'Shop',
        content: <LoadMoreProducts url={'https://dummyjson.com/products'} limit={20} />,
        imgSrc: 'src/img/shopping-bag.svg'
    },
    {
        label: 'About',
        content: <About />,
        imgSrc: 'src/img/info.svg'
    },
    {
        label: 'Cart',
        content: <Cart />,
        imgSrc: 'src/img/shopping-cart.svg'
    },
    {
        label: 'Login',
        content: <Login />,
        imgSrc: 'src/img/shopping-cart.svg'
    },
    // {
    //     label: 'Signup',
    //     content: <Signup />,
    //     imgSrc: 'src/img/shopping-cart.svg'
    // },

]

export default tabs;