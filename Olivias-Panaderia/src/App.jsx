import AppBar from "./AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ProductosDestacados from "./products/ProductosDestacados";
import InstagramPosts from "./info/InstagramPost";
import Suscribirse from "./info/Suscribirse";
import { CartProvider } from "./carrito/CarritoContext";
import Carrusel from "./home/Carrusel";
import Map from "./home/Map";
function App() {
  const containerSx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  };

  return (
    <CartProvider>
      <AppBar />
      <Carrusel />
      <Container sx={containerSx}>
        <div style={{ width: "100%", textAlign: "center", margin: "2rem 0" }}>
          <Typography
            variant="h3"
            component="div"
            sx={{
              fontFamily: "cursive",
              textAlign: "left",
              marginTop: "10px",
              marginBottom: "20px",
              fontSize: {
                xs: "1.5rem", // Tamaño para pantallas pequeñas
                sm: "2rem", // Tamaño para pantallas medianas
                md: "2.5rem", // Tamaño para pantallas grandes
                lg: "3rem", // Tamaño para pantallas muy grandes
              },
            }}
          >
            Nuestros productos más destacados
          </Typography>
          <ProductosDestacados limit={6}/>
        </div>
        <div style={{ width: "100%", marginBottom: "2rem" }}>
          <InstagramPosts />
        </div>
        <div style={{ width: "100%", marginBottom: "2rem" }}>
          <Suscribirse />
        </div>
        <div style={{ width: "100%", marginBottom: "2rem" }}>
          <Typography
            variant="h3"
            component="div"
            sx={{
              fontFamily: "cursive",
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "20px",
              fontSize: {
                xs: "1.5rem", // Tamaño para pantallas pequeñas
                sm: "2rem", // Tamaño para pantallas medianas
                md: "2.5rem", // Tamaño para pantallas grandes
                lg: "3rem", // Tamaño para pantallas muy grandes
              },
            }}
          >
            Encuéntranos
          </Typography>
          <Map />
        </div>
      </Container>
    </CartProvider>
  );
}

export default App;
