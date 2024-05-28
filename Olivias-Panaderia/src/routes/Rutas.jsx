import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from '../App';
import CatalogoProductos from '../products/CatalogoProductos';
import DetalleProducto from '../products/DetalleProductos';
import CarritoCompras from '../carrito/CarritoCompras'; // Asegúrate de importar el componente CarritoCompras
import ResponsiveAppBar from '../AppBar'; // Asegúrate de importar el AppBar correcto

function AppRoutes() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<App />} />
        <Route path="/catalogo" element={<CatalogoProductos />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<CarritoCompras />} /> {/* Asegúrate de que la ruta es "/carrito" */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
