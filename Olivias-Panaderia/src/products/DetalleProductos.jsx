import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getProductoById } from "../services/api";
import {
  Typography,
  Grid,
  Container,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import ResponsiveAppBar from "../AppBar";
import CartContext from "../carrito/CarritoContext";
import ProductosDestacados from "./ProductosDestacados";

const DetalleProducto = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensajeAgregado, setMensajeAgregado] = useState(false);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const productoData = await getProductoById(id);
        setProducto(productoData);
      } catch (error) {
        console.error("Error obteniendo productos:", error);
        setError("Error obteniendo detalle de producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleCantidadChange = (event) => {
    let value = parseInt(event.target.value, 10);
    value = isNaN(value) ? 1 : value;
    value = Math.min(value, producto?.stock || 1);
    setCantidad(value);
  };

  const handleAgregarCarrito = () => {
    console.log("acaaa", producto, id);
    addToCart({ ...producto, quantity: cantidad });
    setMensajeAgregado(true);
    setTimeout(() => setMensajeAgregado(false), 2000);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container sx={{ padding: "2rem", marginTop: "90px" }}>
      <ResponsiveAppBar />
      <Link to="/catalogo" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          sx={{
            marginBottom: "1rem",
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "darkgrey" },
          }}
        >
          Volver a la tienda
        </Button>
      </Link>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              boxShadow: "none",
              minHeight: "350px",
            }}
          >
            {producto?.imagenUrl && (
              <CardMedia
                component="img"
                height="100%"
                image={producto.imagenUrl}
                alt={producto.nombre}
                sx={{
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "8px 0 0 8px",
                }}
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              boxShadow: "none",
              minHeight: "350px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {producto?.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {producto?.descripcion}
              </Typography>
              <Typography variant="body1">
                ${new Intl.NumberFormat("es-CL").format(producto?.precio)}
              </Typography>
              <TextField
                label="Cantidad"
                type="number"
                value={cantidad}
                onChange={handleCantidadChange}
                inputProps={{ min: 1, max: producto?.stock }}
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              />
            </CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={handleAgregarCarrito}
                sx={{
                  marginBottom: "1rem",
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": { backgroundColor: "darkgrey" },
                }}
              >
                Agregar al carrito
              </Button>
              {mensajeAgregado && (
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "cursive",
                    fontSize: "1rem",
                    color: "green",
                  }}
                >
                  ¡Producto agregado con éxito!
                </Typography>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
      <div style={{ marginTop: "100px" }}>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "cursive",
            color: "",
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
              md: "2.5rem",
              lg: "2.5rem",
            },
          }}
        >
          También podría interesarte
        </Typography>
        <ProductosDestacados limit={3} />
      </div>
    </Container>
  );
};

export default DetalleProducto;
