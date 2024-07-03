import React from 'react';
import CreateUser from './CreateUser'
import Users from './Users';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';
import styled from 'styled-components';
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
const Index = () => {
  return (
    <React.StrictMode>
      <Users/>
      <ButtonContainer>
      <CreateUser />        
      </ButtonContainer>
    </React.StrictMode>
  );
};

export default Index;
