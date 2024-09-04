import React from 'react';
import NavBar from './components/navBar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Footer from './components/footer';
import GetProductCategories from './pages/productCategories';
import Products from './pages/products';
import ShoppingCart from './pages/shoppingCart';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import RequestPasswordReset from './pages/requestPasswordReset';
import ResetPassword from './pages/resetPassword';
import VerifyEmail from './pages/verifyEmail';
import ResendVerificationEmail from './pages/resendVerificationEmail';
import Account from './pages/account';
import Admin from './pages/admin';
import Checkout from './pages/checkout';
import UpdateUserInfo from './pages/updateUserInfo';
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
          <Route path="/products/:product" element={<Products />} />
          <Route path='/cart' element={<ShoppingCart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify-email/:token' element={<VerifyEmail />} />
          <Route path='/resend-verification-email' element={<ResendVerificationEmail />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/admin' element={<Admin />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/account' element={<Account />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/update-info' element={<UpdateUserInfo />} />
          </Route>
          <Route path='/request-password-reset' element={<RequestPasswordReset />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Routes>
        <Footer />
      </ShoppingCartProvider>
    </AuthProvider>
  )
}

export default App;
