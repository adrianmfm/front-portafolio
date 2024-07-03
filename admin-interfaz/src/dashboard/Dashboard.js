import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { IoMdPeople, IoMdBasket, IoMdExit, IoMdMenu } from 'react-icons/io';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  position: relative; /* Agregado */

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #333;
  color: #fff;
  flex-shrink: 0;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid #555;

  &:hover {
    background-color: #555;
  }

  svg {
    margin-right: 10px;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #fff;
  border: none;
  padding: 12px 20px;
  cursor: pointer;

  svg {
    margin-right: 10px;
  }

  &:hover {
    background-color: #555;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: ${({ $isOpen }) => ($isOpen ? '200px' : '0')};
  }
`;

const MenuButton = styled.button`
  display: ${({ $isOpen }) => ($isOpen ? 'none' : 'block')}; /* Modificado */
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'none' : 'block')}; /* Modificado */
  }

  @media (min-width: 769px) {
    display: none; /* Ocultar en pantallas más grandes que 768px */
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/loginAdmin');
    console.log('Sesión cerrada');
  };

  const rol = localStorage.getItem("idRol")



  return (
    <DashboardContainer>
      <MenuButton $isOpen={isSidebarOpen} onClick={() => setSidebarOpen(!isSidebarOpen)}>
        <IoMdMenu />
      </MenuButton>
      <Sidebar $isOpen={isSidebarOpen}>
      {rol === '1' && (
          <NavItem to="/admin/users" onClick={() => setSidebarOpen(false)}>
            <IoMdPeople />
            Usuarios
          </NavItem>
        )}
        <NavItem to="/admin/products" onClick={() => setSidebarOpen(false)}>
          <IoMdBasket />
          Productos
        </NavItem>
        <LogoutButton onClick={() => { handleLogout(); setSidebarOpen(false); }}>
          <IoMdExit />
          Salir
        </LogoutButton>
      </Sidebar>
      <ContentContainer $isOpen={isSidebarOpen}>
        <Outlet />
      </ContentContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
