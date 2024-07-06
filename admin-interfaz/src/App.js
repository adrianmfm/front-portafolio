import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Index from './dashboard/Index';
import Products from './productos/Products';
import CreateProduct from './productos/createProduct'
import styled from 'styled-components';
import Login from './auth/Login';
import NotFound from './NotFound';
import Sales from './productos/Sales';

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px; /* Espacio entre los componentes */
  padding: 10px; /* Padding opcional para separar del borde */

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const UnauthorizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
  text-align: center;
`;

const UnauthorizedMessage = styled.h1`
  font-size: 2.5rem;
  color: #ff4d4f;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #ff7875;
  }
`;

function Unauthorized() {
  return (
    <UnauthorizedContainer>
      <UnauthorizedMessage>No tienes autorización para acceder a esta página.</UnauthorizedMessage>
      <BackButton onClick={() => window.history.back()}>Volver</BackButton>
    </UnauthorizedContainer>
  );
}

function App() {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('idRol');
  const nombre = localStorage.getItem('nombre');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Dashboard /> : <Navigate to="/loginAdmin" />} >
          <Route path="dashboard" element={<h1>Bienvenido {nombre}</h1>} />
          {rol === '1' ? (
            <Route path="admin/users" element={<Index />} />
          ) : (
            <Route path="admin/users" element={<Navigate to="/unauthorized" />} />
          )}
          <Route path="admin/products" element={
            <div>
              <Products />
              <ButtonContainer>
                <CreateProduct/>
              </ButtonContainer>
            </div>
          } />
           <Route path="/admin/ventas" element={<Sales />} />
        </Route>
       
        <Route path="/loginAdmin" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
