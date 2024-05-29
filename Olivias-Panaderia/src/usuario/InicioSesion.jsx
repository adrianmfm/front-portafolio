import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const InicioSesion = () => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: '200px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Iniciar Sesión
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Correo Electrónico"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="primary" sx={{ marginTop: '1rem' }}>
          Iniciar Sesión
        </Button>
      </Box>
    </Container>
  );
};

export default InicioSesion;
