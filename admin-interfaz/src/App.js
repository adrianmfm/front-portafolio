import './App.css';
import Login from './auth/Login';
import { BrowserRouter, Routes, Route, Navigate,  } from 'react-router-dom'; // Agrega Navigate
import Dashboard from './dashboard/Dashboard';
import Index from './dashboard/Index';
import Noticias from './dashboard/Noticias';
import Users from './dashboard/Users';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="dashboard" element={<h1>Bienvenido al Dashboard</h1>} />
          <Route path="admin/users" element={<Index />} />
          <Route path="admin/noticias" element={<Noticias />} />
          {/* Agrega más rutas según sea necesario */}
        </Route>
        <Route path="/loginAdmin" element={<h1>Login</h1>} />
      </Routes>
    </BrowserRouter>
  );}


export default App;
