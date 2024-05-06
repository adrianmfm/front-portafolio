import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAnalytics, IoMdPeople, IoMdBasket, IoMdExit } from 'react-icons/io'; 
import Index from './Index';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #333;
  color: #fff;
  flex-shrink: 0; /* Evita que el Sidebar se haga más grande que su ancho */
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
`;

const Dashboard = ({ Content }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/loginAdmin');
    console.log('Sesión cerrada');
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <NavItem to="/dashboard">
          <IoMdAnalytics />
          Dashboard
        </NavItem>
        <NavItem to="/admin/users">
          <IoMdPeople />
          Usuarios
        </NavItem>
        <NavItem to="/admin/products">
          <IoMdBasket />
          Productos
        </NavItem>
        <LogoutButton onClick={handleLogout}>
          <IoMdExit />
          Salir
        </LogoutButton>
      </Sidebar>
      <ContentContainer>
        <Index/>
      </ContentContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
