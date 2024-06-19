import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Carrusel = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const containerStyle = {
    position: 'relative',
    width: '100%',
    margin: '0 auto',
    marginTop: '100px',
  };

  const imgStyle = {
    width: '100%',
    height: 'auto',
  };

  const overlayStyle = {
    position: 'absolute',
    top: isSmallScreen ? '40%' : '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'white',
    padding: isSmallScreen ? '0 20px' : '0',
  };

  const textStyle = {
    fontSize: isSmallScreen ? '1rem' : '2.5rem',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    color: 'white',
    backgroundColor: 'black',
    fontSize: isSmallScreen ? '0.8rem' : '1rem',
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/catalogo");
  };

  return (
    <div style={containerStyle}>
      <img src="/imagenes/carrusel.png" alt="Foto 2" style={imgStyle} />
      <div style={overlayStyle}>
        <Typography variant="h4" component="div" gutterBottom style={textStyle}>
          Conoce nuestros productos saludables
        </Typography>
        <Button onClick={handleClick} variant="contained" sx={buttonStyle}>
          Ver tienda
        </Button>
      </div>
    </div>
  );
};

export default Carrusel;
