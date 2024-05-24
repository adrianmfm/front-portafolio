import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ActionAreaCard() {
  const cardSx = {
    width: '30%',
    margin: '0.5rem',
    '@media (max-width: 768px)': {
      width: '100%',
      margin: '0.5rem 0', 
    },
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <Card sx={cardSx}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image="/src/assets/imagenes/Cheesecake-frambuesa.webp"
            alt="Cheesecake 0 Azúcar"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Cheesecake 0 Azúcar
            </Typography>
            <Typography variant="body2" color="text.secondary">
              $5.000
            </Typography>
            <ShoppingCartIcon />
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={cardSx}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image="/src/assets/imagenes/Muffins.webp"
            alt="Muffins sin gluten"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Muffins sin gluten
            </Typography>
            <Typography variant="body2" color="text.secondary">
              $6.000
            </Typography>
            <ShoppingCartIcon />
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Tarjeta 3 */}
      <Card sx={cardSx}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image="/src/assets/imagenes/PastelMiel.jpeg"
            alt="Pastel de Miel"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Pastel de Miel
            </Typography>
            <Typography variant="body2" color="text.secondary">
              $7.000
            </Typography>
            <ShoppingCartIcon />
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Tarjeta 4 */}
      <Card sx={cardSx}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image="/src/assets/imagenes/Torta.jpeg"
            alt="Torta 0 Azúcar"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Torta 0 Azúcar
            </Typography>
            <Typography variant="body2" color="text.secondary">
              $8.000
            </Typography>
            <ShoppingCartIcon />
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
