import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ShoppingCartProvider>
        <div className='background-image'>
          <App />
        </div>
      </ShoppingCartProvider>
    </Router>
  </React.StrictMode>,
)
