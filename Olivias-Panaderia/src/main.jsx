import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/Rutas';
import Footer from './Footer';
import { CartProvider } from './carrito/CarritoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <AppRoutes/>
      <Footer/>
    </CartProvider>
  </React.StrictMode>
);
