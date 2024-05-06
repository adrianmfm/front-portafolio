// App.jsx

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import RecipeReviewCard from './RecipeReviewCard';
import Grid from '@mui/material/Grid'; // Importamos el componente Grid
import Card from '@mui/material/Card'; // Importamos el componente Card
import CardContent from '@mui/material/CardContent'; // Importamos el componente CardContent
import TextField from '@mui/material/TextField'; // Importamos el componente TextField

function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Olivia´s Panaderia y Pasteleria Saludable
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

function Footer() {
  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Grid item xs={12} sm={8} md={6}> {/* Ajustamos el tamaño del Grid item */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Suscríbete a nuestro boletín
            </Typography>
            <form noValidate autoComplete="off">
              <TextField id="email" label="Correo Electrónico" fullWidth sx={{ mb: 1 }} /> {/* Añadimos espacio entre los campos de entrada */}
              <TextField id="name" label="Nombre" fullWidth sx={{ mb: 2 }} /> {/* Añadimos espacio entre los campos de entrada */}
              <Button variant="contained" color="primary">
                Suscribirme
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Box sx={{ mt: 50 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={4}>
            <RecipeReviewCard 
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
              image="/src/assets/imagenes/CanastaPan.jpg"
              description="This impressive paella is ."
            />
          </Grid>
          <Grid item xs={4}>
            <RecipeReviewCard 
              title="Another Dish"
              subheader="October 21, 2018"
              image="/src/assets/imagenes/Galletas.jpg"
              description="Description of another dish."
            />
          </Grid>
          <Grid item xs={4}>
            <RecipeReviewCard 
              title="Dessert"
              subheader="March 5, 2020"
              image="/src/assets/imagenes/Pasteles.jpg"
              description="Description of a dessert."
            />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}

export default App;
