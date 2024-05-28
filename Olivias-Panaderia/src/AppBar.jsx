import { AppBar, Box, Toolbar, Typography, Container, Avatar } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '@/carrito/CarritoContext';


function ResponsiveAppBar() {
  const { obtenerCantidadTotal } = useContext(CarritoContext);

  return (
    <AppBar position="fixed" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Avatar
                  alt="logo"
                  src="/imagenes/logo-olivias.jpeg"
                  sx={{ width: '100px', height: 'auto', marginRight: '8px' }}
                />
              </Link>
              <Typography variant="h6" sx={{ fontStyle: 'italic', flexGrow: 1 }}>
                Olivia´s Panaderia y Pasteleria Saludable
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <NavLink to="/carrito" style={{ textDecoration: 'none', color: 'inherit' }}>
                <img
                  src="/imagenes/carrito.png"
                  alt="carrito"
                  style={{ width: '40px', height: '40px', marginRight: '8px' }}
                />
                <span>{obtenerCantidadTotal()}</span> {/* Mostrar cantidad de productos */}
              </NavLink>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
