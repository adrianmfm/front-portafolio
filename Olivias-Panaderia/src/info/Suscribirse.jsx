import { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { suscribirCliente } from '../services/api';

const cardSx = {
  maxWidth: '500px',
  margin: 'auto',
  marginTop: '50px',
};

const Suscribirse = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [suscripcionExitosa, setSuscripcionExitosa] = useState(false);
  const [errorCorreo, setErrorCorreo] = useState(false);
  const [errorNombre, setErrorNombre] = useState(false);

  const handleSuscribirse = async () => {
    if (!nombre.trim()) {
      setErrorNombre(true);
      return;
    }

    if (!correo.includes('@') || !correo.includes('.')) {
      setErrorCorreo(true);
      return;
    }

    try {
      const response = await suscribirCliente(nombre, correo);
      if (response) {
        setSuscripcionExitosa(true);
        // Restablecer valores después de la suscripción exitosa
        setNombre('');
        setCorreo('');
        setErrorNombre(false);
        setErrorCorreo(false);
      }
    } catch (error) {
      console.error('Error al suscribirse:', error);
    }
  };

  return (
    <Card variant="outlined" sx={cardSx}>
      <CardContent style={{ textAlign: 'center' }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontFamily: 'cursive',
            fontSize: '2rem',
            marginBottom: '1rem',
          }}
        >
          Únete a nuestra comunidad
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: 'cursive',
            fontSize: '1.2rem',
            marginBottom: '2rem',
          }}
        >
          Suscríbete para recibir recetas y promociones exclusivas
        </Typography>
        <TextField
          id="outlined-basic-email"
          label="Correo Electrónico"
          variant="outlined"
          fullWidth
          value={correo}
          onChange={(e) => {
            setCorreo(e.target.value);
            setErrorCorreo(false);
          }}
          sx={{ fontFamily: 'cursive', maxWidth: '80%', marginBottom: '1rem' }}
          error={errorCorreo}
          helperText={errorCorreo ? 'Correo inválido' : ''}
        />
        <TextField
          id="outlined-basic-name"
          label="Nombre"
          variant="outlined"
          fullWidth
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
            setErrorNombre(false);
          }}
          sx={{ fontFamily: 'cursive', maxWidth: '80%', marginBottom: '2rem' }}
          error={errorNombre}
          helperText={errorNombre ? 'Nombre requerido' : ''}
        />
        <Button
          variant="contained"
          size="normal"
          sx={{
            fontFamily: 'cursive',
            maxWidth: '50%',
            backgroundColor: 'black',
            color: 'white',
            marginBottom: '1rem',
          }}
          onClick={handleSuscribirse}
        >
          Suscribirme
        </Button>
        {suscripcionExitosa && (
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'cursive',
              fontSize: '1rem',
              color: 'green',
            }}
          >
            ¡Te has suscrito con éxito!
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Suscribirse;
