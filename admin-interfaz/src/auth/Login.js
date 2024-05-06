import React from 'react';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

// Estilos para el formulario
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  background-color: #f0f0f0;
  padding: 40px; /* Aumentamos el padding para hacer el formulario más grande */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px; /* Limitamos el ancho máximo del formulario */
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px; /* Añadimos espacio inferior al título */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px; /* Aumentamos el espacio entre elementos del formulario */
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px; /* Aumentamos el padding del contenedor de input */
`;

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
`;

const IconWrapper = styled.div`
  margin-right: 10px; /* Ajustamos el margen derecho del icono */
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px; /* Aumentamos el padding del botón */
  cursor: pointer;
`;

// Componente de inicio de sesión
const Login = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación (simulado)
    // Supongamos que la autenticación es exitosa después de 1 segundo
    setTimeout(() => {
      setLoggedIn(true);
    }, 1000); // Simulamos un retraso de 1 segundo antes de redirigir
  };

  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container>
      <FormWrapper>
        <Title>Iniciar sesión</Title>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <IconWrapper>
              <FaUser />
            </IconWrapper>
            <Input type="text" placeholder="Usuario" />
          </InputWrapper>
          <InputWrapper>
            <IconWrapper>
              <FaLock />
            </IconWrapper>
            <Input type="password" placeholder="Contraseña" />
          </InputWrapper>
          <Button type="submit">Ingresar</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default Login;
