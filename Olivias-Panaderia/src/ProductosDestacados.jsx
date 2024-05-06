import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ActionAreaCard() {
  // Función para manejar el estilo de las tarjetas
  const handleCardStyle = (marginLeft, marginRight, widthPercentage) => ({
    width: `${widthPercentage}%`, // Ajustando el ancho de la tarjeta
    marginLeft: `${marginLeft}px`,
    marginRight: `${marginRight}px`, // Agregando margen derecho
    
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', maxWidth: '1000px' }}>
      {/* Tarjeta 1 */}
      <Card sx={handleCardStyle(-15, 5, 30)}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image="/src/assets/imagenes/Cheesecake-frambuesa.webp"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Cheesecake 0 Azúcar
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              $5.000
            </Typography>
            {/* Agregar el icono de carrito de compras */}
            <ShoppingCartIcon />
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Tarjeta 2 */}
      <Card sx={handleCardStyle(5, 5, 30)}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image="/src/assets/imagenes/Muffins.webp"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Muffins sin gluten
            </Typography>
            <div style={{ marginBottom: '2.5rem' }} />
            <Typography variant="body2" color="text.secondary">
              $6.000
            </Typography>
            {/* Agregar el icono de carrito de compras */}
            <ShoppingCartIcon />
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Tarjeta 3 */}
      <Card sx={handleCardStyle(5, 5, 30)}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image="/src/assets/imagenes/PastelMiel.jpeg"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Pastel de Miel
            </Typography>
            <div style={{ marginBottom: '2.5rem' }} />
            <Typography variant="body2" color="text.secondary">
              $7.000
            </Typography>
            {/* Agregar el icono de carrito de compras */}
            <ShoppingCartIcon />
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Tarjeta 4 */}
      <Card sx={handleCardStyle(5, -15, 30)}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image="/src/assets/imagenes/Torta.jpeg"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Torta 0 Azúcar
            </Typography>
            <div style={{ marginBottom: '2.5rem' }} />
            <Typography variant="body2" color="text.secondary">
              $8.000
            </Typography>
            {/* Agregar el icono de carrito de compras */}
            <ShoppingCartIcon />
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
