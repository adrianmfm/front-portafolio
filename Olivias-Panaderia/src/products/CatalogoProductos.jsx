import { useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllProductos } from '../services/api';
import ResponsiveAppBar from '../AppBar';

const CatalogoProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosData = await getAllProductos();
        setProductos(productosData);
      } catch (error) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  const productosConStock = productos.filter(producto => producto.stock > 0);

  return (
    <Container sx={{ padding: '2rem', marginTop: '90px' }}>
      <ResponsiveAppBar/>
      <Typography variant="h4" component="h1" gutterBottom style={{fontFamily: 'cursive',}}>
        Nuestros productos
      </Typography>
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
                  />
                )}
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <Typography gutterBottom variant="h6" component="div">
                      {producto.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {producto.descripcion}
                    </Typography>
                    <Typography variant="body1">
                      Precio: ${producto.precio}
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    sx={{ marginTop: '1rem', backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkgrey' } }}
                  >
                    Agregar al carrito
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CatalogoProductos;
