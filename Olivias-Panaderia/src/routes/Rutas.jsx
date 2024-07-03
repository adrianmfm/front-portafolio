import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from '../App';
import CatalogoProductos from '../products/CatalogoProductos'; 
import DetalleProducto from '../products/DetalleProductos';
import { AppBar } from '@mui/material';
import Cart from '../carrito/Cart';
import PaginaExito from '../pages/PaginaExito';
import PaginaError from '../pages/PaginaError';
import Historia from '../info/Historia';
import NotFound from '../pages/NotFound';
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
        <Route path='/carrito' element={ <Cart/>}/>
        <Route path='/venta/exito' element={ <PaginaExito/>}/>
        <Route path='/venta/fallida' element={ <PaginaError/>}/>
        <Route path='/historia' element={ <Historia/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
