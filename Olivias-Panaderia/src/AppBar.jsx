import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Container, Avatar, Menu, MenuItem } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '@/carrito/CarritoContext';

function ResponsiveAppBar() {
  const { obtenerCantidadTotal } = useContext(CarritoContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              <Avatar 
                src="/broken-image.jpg" 
                sx={{ marginLeft: '16px', cursor: 'pointer' }} 
                onClick={handleAvatarClick}
              />
            </Box>
          </Box>
        </Toolbar>
      </Container>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/usuario/InicioSesion" style={{ textDecoration: 'none', color: 'inherit' }}>Iniciar Sesión</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/usuario/registro" style={{ textDecoration: 'none', color: 'inherit' }}>Registrarse</Link>
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default ResponsiveAppBar;
