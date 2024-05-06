import AppBar from './AppBar';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ProductosDestacados from './ProductosDestacados';
import UltimasPublicaciones from './UltimasPublicaciones'; // Importa el componente de UltimasPublicaciones


function App() {
  const cardSx = {
    width: '145%',
    height: '500px',
    mb: '1rem', // Ajuste para separar los cards verticalmente
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '-15rem',
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar />
      {/* Contenido principal de la página */}
      <Container sx={{ flexGrow: 1, mt: '5rem' }}>
        {/* Primer Card */}
        <Card variant="outlined" sx={cardSx}>
          <CardContent>
            <div style={{ marginBottom: '1rem' }} />
            <Typography variant="h5" component="div" sx={{ fontFamily: 'cursive' }}>Bienvenido a nuestra panadería saludable</Typography>
            <div style={{ marginBottom: '1rem' }} />
            <Typography variant="body1" sx={{ fontFamily: 'cursive' }}>Descubre nuestros deliciosos productos</Typography>
            <div style={{ marginBottom: '3rem' }} />
            <Button variant="contained" size="Normal" sx={{ fontFamily: 'cursive', width: '50%', margin: 'auto', marginLeft: '5rem', backgroundColor: 'black', color: 'white', }}>
              Ver Tienda
            </Button>
          </CardContent>
        </Card>
         {/* Segundo Card */}
         <Card variant="outlined" sx={cardSx}>
          <CardContent>
            <div style={{ marginBottom: '2rem' }} />
            <Typography variant="h5" component="div" marginLeft= '22rem' sx={{ fontFamily: 'cursive' }}>Productos Destacados</Typography>
            <div style={{ marginBottom: '2rem' }} />
            <Typography variant="body1" sx={{ fontFamily: 'cursive' }}></Typography>
            <ProductosDestacados />
          </CardContent>
        </Card>

        {/* Tercera Card */}
        <Card variant="outlined" sx={cardSx}>
          <CardContent>
            <Typography variant="h5" component="div" marginLeft= '15rem' sx={{ fontFamily: 'cursive' }}>Nuestro Compromiso</Typography>
            <div style={{ marginBottom: '2rem' }} />
            <Typography variant="body1" sx={{ fontFamily: 'cursive' }}></Typography>
            
          </CardContent>
        </Card>

        {/* Cuarta Card */}
        <Card variant="outlined" sx={cardSx}>
          <CardContent>
            <Typography variant="h5" component="div" marginLeft= '15rem' sx={{ fontFamily: 'cursive' }}>Últimas Publicaciones</Typography>
            <div style={{ marginBottom: '2rem' }} />
            <Typography variant="body1" sx={{ fontFamily: 'cursive' }}></Typography>
            {/* Añade el componente UltimasPublicaciones */}
            <UltimasPublicaciones />
          </CardContent>
        </Card>

        {/* Quinta Card */}
        <Card variant="outlined" sx={cardSx}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontFamily: 'cursive', fontSize: '2rem', marginBottom: '1rem' }}>
              Únete a nuestra comunidad
            </Typography>
            <Typography variant="subtitle1" sx={{ fontFamily: 'cursive', fontSize: '1.2rem', marginBottom: '2rem' }}>
              Suscríbete para recibir recetas y promociones exclusivas
            </Typography>
            {/* TextField para el correo electrónico */}
            <TextField id="outlined-basic-email" label="Correo Electrónico" variant="outlined" fullWidth mb={2} sx={{ width: '80%', fontFamily: 'cursive' }} />
            {/* Separador de 1 centímetro */}
            <div style={{ marginBottom: '1rem' }} />
            {/* TextField para el nombre */}
            <TextField id="outlined-basic-name" label="Nombre" variant="outlined" fullWidth mb={2} sx={{ width: '80%', fontFamily: 'cursive' }} />
            {/* Separador de 1 centímetro */}
            <div style={{ marginBottom: '2rem' }} />
            {/* Botón de suscripción */}
            <Button variant="contained" size="Normal" sx={{ fontFamily: 'cursive', width: '50%', margin: 'auto',marginLeft: '5rem',backgroundColor: 'black',color: 'white',  }}>
              Suscribirme
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Container>
  );
}

export default App;