import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductoById } from '../services/api';
import { Typography, Grid, Container, Button, Card, CardContent, CardMedia, TextField } from '@mui/material';
import ResponsiveAppBar from '../AppBar';
import Footer from '../Footer';

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const productoData = await getProductoById(id);
        setProducto(productoData);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleCantidadChange = (event) => {
    let value = parseInt(event.target.value, 10);
    value = isNaN(value) ? 1 : value; // Si el valor no es un número válido, se establece en 1
    value = Math.min(value, producto.stock); // Limitar al stock disponible
    setCantidad(value);
  };

  const handleAgregarCarrito = () => {
    console.log(`Agregando ${cantidad} unidades del producto al carrito`);
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container sx={{ padding: '2rem', marginTop: '90px' }}>
      <ResponsiveAppBar/>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ display: 'flex', alignItems: 'center', boxShadow: 'none', minHeight: '350px' }}>
            {producto.imagenUrl && (
              <CardMedia
                component="img"
                height="100%"
                image={producto.imagenUrl}
                alt={producto.nombre}
                sx={{ width: '80%', objectFit: 'cover', borderRadius: '8px 0 0 8px' }}
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ boxShadow: 'none', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {producto.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {producto.descripcion}
              </Typography>
              <Typography variant="body1">
                Precio: ${producto.precio}
              </Typography>
              <TextField style={{marginTop: '120px'}}
                label="Cantidad"
                type="number"
                value={cantidad}
                onChange={handleCantidadChange}
                inputProps={{ min: 1, max: producto.stock }} // Establecer mínimo y máximo
              />
            </CardContent>
            <Button
              variant="contained"
              onClick={handleAgregarCarrito}
              sx={{ marginBottom: '1rem', backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkgrey' } }}
            >
              Agregar al carrito
            </Button>
          </Card>
        </Grid>
      </Grid>
      <Footer/>
    </Container>
  );
};

export default DetalleProducto;
