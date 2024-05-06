import './App.css';
import Login from './auth/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Agrega Navigate
import Dashboard from './dashboard/Dashboard';
import Index from './dashboard/Index';

function App() {
  return ( 
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/loginAdmin" />} /> {/* Ruta inicial */}
          <Route path="/loginAdmin" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard Content={<Index/>}/>} />
          <Route path="/admin/users" element={<Dashboard />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
