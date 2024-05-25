import AppBar from "./AppBar";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ProductosDestacados from "./products/ProductosDestacados";
import InstagramPosts from "./info/InstagramPost";
import Compromiso from "./info/Compromiso";
import { useNavigate } from "react-router-dom";
import Suscribirse from "./info/Suscribirse";
function App() {
  const cardSx = {
    mb: "1rem",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/catalogo");
  };

  return (
     <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <AppBar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          width: "100%",
        }}
      >
        {/* Primer Card */}
        <Card
          variant="outlined"
          sx={{
            ...cardSx,
            maxWidth: "100%",
            marginBottom: "20px",
            marginTop: "100px",
          }}
        >
          <CardContent style={{textAlign: 'center'}}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontFamily: "cursive",
                textAlign: "center",
                marginTop: "2rem",
              }}
            >
              Bienvenido a nuestra panadería saludable
            </Typography>
            <div style={{ marginBottom: "1rem" }} />
            <Typography
              variant="body1"
              sx={{ fontFamily: "cursive", textAlign: "center" }}
            >
              Descubre nuestros deliciosos productos
            </Typography>
            <div style={{ marginBottom: "3rem"}} />
            <Button
              variant="contained"
              size="Normal"
              sx={{
                fontFamily: "cursive",
                backgroundColor: "black",
                color: "white"
              }}
              onClick={handleClick}
            >
              Ver Tienda
            </Button>
          </CardContent>
        </Card>
        <Card variant="outlined" sx={cardSx}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontFamily: "cursive" }}
            >
              Productos Destacados
            </Typography>
            <div style={{ marginBottom: "2rem" }} />
            <Typography
              variant="body1"
              sx={{ fontFamily: "cursive" }}
            ></Typography>
            <ProductosDestacados />
          </CardContent>
        </Card>
        <Card variant="outlined" sx={cardSx}>
          <CardContent>
            <Compromiso />
          </CardContent>
        </Card>
        <Card variant="outlined" sx={cardSx}>
          <CardContent>
            <InstagramPosts />
          </CardContent>
        </Card>
      </Container>
      <CardContent>
      <Suscribirse/>
      </CardContent>
    </Container>

  );
}

export default App;
