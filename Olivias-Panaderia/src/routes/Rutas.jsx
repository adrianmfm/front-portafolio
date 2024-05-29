import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from '../App';
import CatalogoProductos from '../products/CatalogoProductos';
import DetalleProducto from '../products/DetalleProductos';
import CarritoCompras from '../carrito/CarritoCompras'; // Asegúrate de importar el componente CarritoCompras
import ResponsiveAppBar from '../AppBar'; // Asegúrate de importar el AppBar correcto
import InicioSesion from '../usuario/InicioSesion'; 
import Registro from '../usuario/Registro';

function AppRoutes() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<App />} />
        <Route path="/catalogo" element={<CatalogoProductos />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<CarritoCompras />} /> 
        <Route path="/usuario/inicioSesion" element={<InicioSesion />} />
        <Route path="/usuario/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
