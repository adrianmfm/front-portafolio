import Card  from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CircularProgress, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { getAllProductos } from '../services/api';
import { Link } from 'react-router-dom'; // Cambiado a 'react-router-dom'

// eslint-disable-next-line react/prop-types
export default function ProductosDestacados({limit}) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosData = await getAllProductos();
        setProductos(productosData);
      } catch (error) {
        setError('Error obteniendo productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

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

  const cardSx = {
    width: '30%',
    margin: '0.5rem',
    '@media (max-width: 768px)': {
      width: '100%',
      margin: '0.5rem 0',
    },
  };

  const productosConStock = productos.filter(producto => producto.stock > 0).slice(0
    , limit);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {productosConStock.map((producto) => (
        <Card key={producto.id} sx={cardSx}>
          <CardActionArea component={Link} to={`/producto/${producto.id}`}>
            <CardMedia
              component="img"
              height="150"
              image={producto.imagenUrl}
              alt={producto.nombre}
              sx={{
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {producto.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Precio: {new Intl.NumberFormat('es-CL').format(producto.precio)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
