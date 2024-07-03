import { Box, Container, Typography, Grid } from '@mui/material';

const Footer = () => {
  const phoneNumber = '+56961162971'; // Número de teléfono de WhatsApp
  const message = 'Hola, estoy interesado en tus servicios'; // Mensaje que deseas enviar

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const centralIconSize = 50; // Ajusta el tamaño de los iconos centrales aquí
  const sideIconSize = 100; // Ajusta el tamaño de los iconos laterales aquí
  const iconSpacing = 4; // Ajusta el espaciado entre los iconos aquí
  const sideIconSpacing = 15; // Ajusta el espaciado de los iconos laterales aquí

  return (
    <Box
      sx={{
        marginTop: '10%',
        width: '100%',
        height: 'auto',
        backgroundColor: '#000',
        color: 'white',
        py: 3,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        textAlign: 'center',
        justifyContent: 'center',
        '@media (max-width: 600px)': {
          width: '100%',
        },
      }}
    >
      <Container style={{ width: '100%' }}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Box mb={2}>
            <img src="/imagenes/webpay-logo.png" alt="Logo Olivia's" style={{ width: 200, height: 'auto' }} />
          </Box>
          <Typography variant="h6" gutterBottom>
            {/* Puedes agregar texto aquí si es necesario */}
          </Typography>
          <Grid container spacing={iconSpacing} justifyContent="center" alignItems="center">
            <Grid item sx={{ marginRight: sideIconSpacing }}>
              <img src="/imagenes/SinAzucarLogo.jpg" alt="Logo Izquierda" style={{ width: sideIconSize, height: sideIconSize }} />
            </Grid>
            <Grid item>
              <a href="https://www.instagram.com/olivias.panaderia" target="_blank" rel="noopener noreferrer">
                <img src="/imagenes/logo-ig.png" alt="Instagram" style={{ width: centralIconSize, height: centralIconSize }} />
              </a>
            </Grid>
            <Grid item>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <img src="/imagenes/logo-ws.png" alt="WhatsApp" style={{ width: centralIconSize, height: centralIconSize }} />
              </a>
            </Grid>
            <Grid item sx={{ marginLeft: sideIconSpacing }}>
              <img src="/imagenes/SinGlutenLogo.jpg" alt="Logo Derecha" style={{ width: sideIconSize, height: sideIconSize }} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
