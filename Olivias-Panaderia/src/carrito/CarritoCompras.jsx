import React, { useContext } from 'react';
import { Card, CardContent, Typography, Container, Grid } from '@mui/material';
import ResponsiveAppBar from '../AppBar';
import { CarritoContext } from '@/carrito/CarritoContext';


const CarritoCompras = () => {
  const { carrito } = useContext(CarritoContext);

  return (
    <div>
      <ResponsiveAppBar />
      <Container sx={{ padding: '2rem', marginTop: '90px' }}>
        <Typography variant="h4" component="h1" gutterBottom style={{fontFamily: 'cursive',}}>
          Carrito de Compras
        </Typography>
        <Grid container spacing={4}>
          {carrito.map((producto, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 'none', minHeight: '350px' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                  <Typography gutterBottom variant="h6" component="div">
                    {producto.nombre}
                  </Typography>
                  <Typography variant="body1">
                    Precio: ${producto.precio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default CarritoCompras;
