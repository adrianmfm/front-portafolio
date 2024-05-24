import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Index from './dashboard/Index';
import Products from './productos/Products';
import DeleteProduct from './productos/DeleteProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="dashboard" element={<h1>Bienvenido al Dashboard</h1>} />
          <Route path="admin/users" element={<Index />} />
          <Route path="admin/products" element={
            <div>
              <Products />
              <DeleteProduct />
            </div>
          } />
        </Route>
        <Route path="/loginAdmin" element={<h1>Login</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
