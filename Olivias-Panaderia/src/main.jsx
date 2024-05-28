import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/Rutas';
import Footer from './Footer';
import { CarritoProvider } from './carrito/CarritoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CarritoProvider>
      <AppRoutes />
      <Footer />
    </CarritoProvider>
  </React.StrictMode>
);
