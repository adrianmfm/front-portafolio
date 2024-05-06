import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';


const ExpandMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
      {/* Tarjeta 1 */}
      <Card sx={{ maxWidth: 345, marginRight: '1rem' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              A
            </Avatar>
          }
        
          title="Galletas sin gluten"
          subheader="Chispas chocolate amargo"
        />
        <CardMedia
          component="img"
          height="194"
          image="/src/assets/imagenes/Galletas.jpg"
          alt="Paella dish"
        />
        
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
         
        </Collapse>
      </Card>

      {/* Tarjeta 2 */}
      <Card sx={{ maxWidth: 345, marginRight: '1rem' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
        
          title="Pastel de fresa"
          subheader="Sin azúcar añadida"
        />
        <CardMedia
          component="img"
          height="194"
          image="/src/assets/imagenes/PastelFresa.jpeg"
          alt="Paella dish"
        />
        
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          
        </Collapse>
      </Card>

      {/* Tarjeta 3 */}
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              D
            </Avatar>
          }
         
          title="Rico pan surtido sin gluten"
          subheader="Apto para celiacos"
        />
        <CardMedia
          component="img"
          height="194"
          image="/src/assets/imagenes/CanastaPan.jpg"
          alt="Paella dish"
        />
        
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
         
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
     
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
