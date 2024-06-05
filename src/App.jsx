import React from 'react';
import NavBar from './components/navBar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import GetProductCategories from './components/getProductCategories';
import GetProductsByCategory from './components/getProductsByCategory';
import Search from './components/search';
import ShoppingCart from './components/shoppingCart';
import Login from './components/login';
import Signup from './components/signup';
import Profile from './components/profile';
import RequestPasswordReset from './components/requestPasswordReset';
import ResetPassword from './components/resetPassword';
import VerifyEmail from './components/verifyEmail';
import ResendVerificationEmail from './components/resendVerificationEmail';
import Account from './components/account';
import Admin from './components/admin';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';

function App() {

  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<GetProductCategories />} />
          <Route path='/shop/:category' element={<GetProductsByCategory />} />
          <Route path='/search' element={<Search />} />
          <Route path='/cart' element={<ShoppingCart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify-email/:token' element={<VerifyEmail />} />
          <Route path='/resend-verification-email' element={<ResendVerificationEmail />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/admin' element={<Admin />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/account' element={<Account />} />
          </Route>
          <Route path='/request-password-reset' element={<RequestPasswordReset />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Routes>
      </ShoppingCartProvider>
    </AuthProvider>
  )
}

export default App;
