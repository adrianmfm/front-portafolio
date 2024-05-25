import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/Rutas';
import Footer from './Footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <AppRoutes/>
    <Footer/>
  </React.StrictMode>
);
