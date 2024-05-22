import Typography from '@mui/material/Typography';

const Compromiso = () => {
  return (
    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontFamily: 'cursive',
            padding: '10px',
            textAlign: 'center',
          }}
        >
          Nuestro Compromiso
        </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'cursive', textAlign: 'center', padding: '30px' }}>
        En Olivias Panadería & Pastelería Saludable nos comprometemos a ofrecerte productos de panadería y pastelería saludables, diseñados especialmente para personas con distintas alergias alimentarias como la diabetes y la celiaquía. Con años de experiencia internacional y nacional, y respaldados por una maestría en celiaquía, nuestro objetivo es brindarte productos de alta calidad que se adapten a tus necesidades de salud. Nuestra página web está diseñada para ofrecerte información detallada sobre nuestras líneas de productos, posicionar nuestra marca y facilitar la compra online a través de un carrito de compra seguro y una integración con webPay. ¡Descubre el sabor saludable en cada bocado con Olivias Panadería & Pastelería Saludable!
      </Typography>
    </div>
  );
};

export default Compromiso;
