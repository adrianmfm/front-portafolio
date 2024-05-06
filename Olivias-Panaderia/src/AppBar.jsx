import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField'; // Importar TextField
import SearchIcon from '@mui/icons-material/Search'; // Importar ícono de búsqueda

function ResponsiveAppBar() {
  return (
    <AppBar position="fixed" color="inherit"> {/* Cambia el color a gris */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}> {/* Alinea los elementos al centro y espacio entre ellos */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}> {/* Contenedor para el avatar y el texto */}
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ marginRight: '8px' }} /> {/* Agrega margen a la derecha */}
              <Typography variant="h6" sx={{ fontStyle: 'italic', flexGrow: 1 }}> {/* Añade crecimiento flexible y estilo cursiva */}
                Olivia´s Panaderia y Pasteleria Saludable
              </Typography>
            </Box>
            <TextField
              id="outlined-size-small"
              defaultValue="Buscar"
              size="small"
              InputProps={{ // Propiedad para configurar el componente de entrada
                endAdornment: (
                  <SearchIcon color="action" /> // Ícono de búsqueda dentro del TextField
                ),
              }}
              sx={{ marginLeft: 'auto' }} // Mueve el TextField al final
            />
          </Box>

          {/* Elimina el botón de búsqueda */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
