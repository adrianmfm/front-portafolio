import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/assets/imagenes/Muffins.webp" // Corrige la ruta de la imagen
          alt="Muffins" // Cambia el texto alternativo por algo relevante
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Muffins
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Muffins are a delicious treat enjoyed by many people around the world.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
