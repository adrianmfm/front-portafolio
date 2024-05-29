import React, { useContext } from 'react';
import { Card, CardContent, Typography, Container, Grid, CardMedia, Button, Box, IconButton } from '@mui/material';
import ResponsiveAppBar from '../AppBar';
import { CarritoContext } from '@/carrito/CarritoContext';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CarritoCompras = () => {
  const { carrito, eliminarProducto, incrementarCantidad, decrementarCantidad } = useContext(CarritoContext);
  const navigate = useNavigate();

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Container sx={{ padding: '2rem', marginTop: '90px' }}>
        <Typography variant="h4" component="h1" gutterBottom style={{ fontFamily: 'cursive' }}>
          Carrito de Compras
        </Typography>
        {carrito.length === 0 ? (
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    Tu carrito está vacío
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/catalogo')}
                    sx={{ marginTop: '1rem' }}
                  >
                    Ver Catálogo
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Grid container direction="column" spacing={2}>
                {carrito.map((producto, index) => (
                  <Grid item key={index}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 'none' }}>
                      <CardContent>
                        <Grid container spacing={2}>
                          {producto.imagenUrl && (
                            <Grid item>
                              <CardMedia
                                component="img"
                                image={producto.imagenUrl}
                                alt={producto.nombre}
                                sx={{ width: 140, height: 140, objectFit: 'cover' }}
                              />
                            </Grid>
                          )}
                          <Grid item xs>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                              <Typography gutterBottom variant="h6" component="div">
                                {producto.nombre}
                              </Typography>
                              <Typography variant="body1">
                                Precio: ${producto.precio}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton onClick={() => decrementarCantidad(producto.id)}>
                                  <RemoveIcon />
                                </IconButton>
                                <Typography variant="body2">
                                  {producto.cantidad}
                                </Typography>
                                <IconButton onClick={() => incrementarCantidad(producto.id)}>
                                  <AddIcon />
                                </IconButton>
                              </Box>
                              <Button
                                startIcon={<DeleteIcon />}
                                color="secondary"
                                onClick={() => eliminarProducto(producto.id)}
                              >
                                Eliminar Producto
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    Resumen de la compra
                  </Typography>
                  <Typography variant="body1">
                    Total: ${calcularTotal().toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate('/Pago')}
                    sx={{ marginTop: '1rem' }}
                  >
                    Ir a Pagar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        {carrito.length > 0 && (
          <Box sx={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/catalogo')}>
              Seguir Comprando
            </Button>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default CarritoCompras;
