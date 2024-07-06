import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../services/api';

// Estilos para el formulario
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  background-color: #f0f0f0;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;


const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(correo, password);
      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('idRol', result.idRol);
        localStorage.setItem('nombre', result.nombre)

        window.location = '/dashboard'
      } else {
        setError('Login fallido');
      }
    } catch (error) {
      setError('Error en obtener usuario: ' + error.message);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Iniciar sesión</Title>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <IconWrapper>
              <FaUser />
            </IconWrapper>
            <Input
              type="text"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <IconWrapper>
              <FaLock />
            </IconWrapper>
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputWrapper>
          <Button type="submit">Ingresar</Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default Login;
