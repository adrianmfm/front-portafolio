import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Registro = () => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: '200px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Registrarse
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Nombre"
          fullWidth
          margin="normal"
          variant="outlined"
        />
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
          Registrarse
        </Button>
      </Box>
    </Container>
  );
};

export default Registro;
