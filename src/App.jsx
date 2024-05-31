import React from 'react';
import NavBar from './components/navBar';
import { CurrentTabProvider } from './contexts/CurrentTabContext';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
import { LoginSignupProvider } from './contexts/LoginSignupContext';
function App() {

  return (
    <LoginSignupProvider>
      <CurrentTabProvider>
        <ShoppingCartProvider>
          <div className='background-image'>
            <NavBar />
          </div>
        </ShoppingCartProvider>
      </CurrentTabProvider>
    </LoginSignupProvider>
  )
}

export default App;
