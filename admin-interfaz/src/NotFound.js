import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
  text-align: center;
`;

const NotFoundMessage = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const HomeButton = styled(Link)`
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #555;
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundMessage>Página no encontrada (404)</NotFoundMessage>
      <HomeButton to="/">Volver al inicio</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;
