import React, { useEffect, useState, useContext } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Snackbar, Button, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllProductos } from '../services/api';
import ResponsiveAppBar from '../AppBar';
import CartContext from '../carrito/CarritoContext';
import FiltroProductos from './FiltroProductos';

const CatalogoProductos = () => {
  const { addToCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensajeAgregado, setMensajeAgregado] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosData = await getAllProductos();
        setProductos(productosData);
        setFilteredProductos(productosData); // Inicialmente mostramos todos los productos
      } catch (error) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleAgregarCarrito = (producto) => {
    addToCart({ ...producto, quantity: 1 });
    setMensajeAgregado(true);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  const productosConStock = filteredProductos.filter(producto => producto.stock > 0);

  return (
    <Container sx={{ padding: '2rem', marginTop: '90px' }}>
      <ResponsiveAppBar />
      <Typography variant="h4" component="h1" gutterBottom style={{ fontFamily: 'cursive' }}>
        Nuestros productos
      </Typography>

      <Grid container spacing={4}>
        {/* Columna del filtro */}
        <Grid item xs={12} sm={4} md={3}>
          <FiltroProductos setFilteredProductos={setFilteredProductos} />
        </Grid>

        {/* Columna de productos */}
        <Grid item xs={12} sm={8} md={9}>
          <Grid container spacing={4}>
            {productosConStock.map((producto) => (
              <Grid item key={producto.id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 'none', minHeight: '350px' }}>
                  <CardActionArea component={Link} to={`/producto/${producto.id}`} sx={{ flexGrow: 1 }}>
                    {producto.imagenUrl && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={producto.imagenUrl}
                        alt={producto.nombre}
                        sx={{
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ height: '100px' }}>
                        <Typography variant="body1" style={{ marginBottom: '10px' }}>
                          ${new Intl.NumberFormat('es-ES').format(producto.precio)}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                          {producto.nombre}
                        </Typography>
                      </div>
                    </CardContent>
                  </CardActionArea>
                  <Button
                    onClick={() => handleAgregarCarrito(producto)}
                    variant="contained"
                    sx={{ marginBottom: '30%', backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkgrey' } }}
                  >
                    Agregar al carrito
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      
      <Snackbar
        open={mensajeAgregado}
        autoHideDuration={3000}
        onClose={() => setMensajeAgregado(false)}
        message={
          <span style={{ display: 'flex', justifyContent: 'center', marginLeft: '30px' }}>
            ¡Producto agregado con éxito!
          </span>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          color: 'black',
        }}
      />
    </Container>
  );
};

export default CatalogoProductos;
