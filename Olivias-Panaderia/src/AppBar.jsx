import { useState, useContext } from 'react';
import { AppBar, Box, Toolbar, Typography, Container, Avatar, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import CarritoContext from './carrito/CarritoContext';

function ResponsiveAppBar() {
  const { getTotalItems } = useContext(CarritoContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  //const cantidadTotal = Number(getTotalItems()) || 0;

  return (
    <>
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
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: '16px' }}>
                  <Button color="inherit">Inicio</Button>
                </NavLink>
                <NavLink to="/catalogo" style={{ textDecoration: 'none', color: 'inherit', marginRight: '16px' }}>
                  <Button color="inherit">Productos</Button>
                </NavLink>
                <NavLink to="/historia" style={{ textDecoration: 'none', color: 'inherit', marginRight: '16px' }}>
                  <Button color="inherit">Historia</Button>
                </NavLink>
                <NavLink to="/carrito" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                  <img
                    src="/imagenes/carrito.png"
                    alt="carrito"
                    style={{ width: '40px', height: '40px', marginRight: '8px' }}
                  />
                  <span style={{
                    backgroundColor: '#000',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 8px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    transition: 'transform 0.5s ease-in-out, background-color 0.3s ease-in-out',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>{getTotalItems()}</span>
                </NavLink>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        <List>
          <ListItem component={NavLink} to="/" onClick={handleDrawerToggle}>
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem component={NavLink} to="/catalogo" onClick={handleDrawerToggle}>
            <ListItemText primary="Productos" />
          </ListItem>
          <ListItem component={NavLink} to="/historia" onClick={handleDrawerToggle}>
            <ListItemText primary="Historia" />
          </ListItem>
          <ListItem component={NavLink} to="/carrito" onClick={handleDrawerToggle}>
            <ListItemText primary="Carrito" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default ResponsiveAppBar;
