import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from '../App';
import CatalogoProductos from '../products/CatalogoProductos'; 
import DetalleProducto from '../products/DetalleProductos';
import { AppBar } from '@mui/material';


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<>
          <AppBar />
          <App />
        </>} />
        <Route path="/catalogo" element={<CatalogoProductos />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
