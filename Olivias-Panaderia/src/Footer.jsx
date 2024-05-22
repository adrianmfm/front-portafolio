import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  const phoneNumber = '+56961162971'; // Número de teléfono de WhatsApp
  const message = 'Hola, estoy interesado en tus servicios'; // Mensaje que deseas enviar

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Box
      sx={{
        marginTop: '100px',
        width: '100%%',
        height: 'auto',
        backgroundColor: '#fff',
        color: 'white',
        py: 3,
        backgroundImage: 'url(/path/to/your/background-image.jpg)', // Asegúrate de tener la imagen en tu proyecto
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        textAlign: 'center',
      }}
    >
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Box mb={2}>
            <img src="/imagenes/webpay-logo.png" alt="Logo Olivia's" style={{ width: 200, height: 'auto' }} />
          </Box>
          <Typography variant="h6" gutterBottom>
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <a href="https://www.instagram.com/olivias.panaderia" target="_blank" rel="noopener noreferrer">
              <img src="/imagenes/logo-ig.png" alt="Instagram" style={{ width: 24, height: 24 }} />
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <img src="/imagenes/logo-ws.png" alt="WhatsApp" style={{ width: 24, height: 24 }} />
            </a>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
