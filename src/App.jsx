import React from 'react';
import NavBar from './components/navBar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import GetProductCategories from './components/getProductCategories';
import Search from './components/search';
import ShoppingCart from './components/shoppingCart';
import Login from './components/login';
import Signup from './components/signup';
import RequestPasswordReset from './components/requestPasswordReset';
import Profile from './components/profile';

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<GetProductCategories url={'https://dummyjson.com/products/'} categories={'category-list'} />} />
        <Route path='/search' element={<Search url={'https://dummyjson.com/products/search'} />} />
        <Route path='/cart' element={<ShoppingCart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/requestpasswordreset' element={<RequestPasswordReset />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App;
