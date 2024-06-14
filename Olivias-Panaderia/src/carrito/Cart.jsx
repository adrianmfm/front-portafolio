import { useContext, useEffect, useState } from "react";
import CartContext from "./CarritoContext";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import ResponsiveAppBar from "../AppBar";
import { pagoWebpay } from "../services/api";

const Cart = () => {
  const { cart, removeFromCart, updateCartItem } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cart.reduce(
        (acc, item) => acc + item.precio * item.quantity,
        0
      );
      setTotal(totalAmount);
    };

    const calculateTotalItems = () => {
      const totalItemsCount = cart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      setTotalItems(totalItemsCount);
    };

    calculateTotal();
    calculateTotalItems();
  }, [cart]);

  const handleCantidadChange = (event, item) => {
    let value = parseInt(event.target.value, 10);
    value = isNaN(value) ? 1 : value;
    value = Math.max(1, Math.min(value, item.stock)); 
    updateCartItem(item.id, value);
  };
  const createPayment =  async () =>{
    let lista = cart.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity       
      }
    })
    const response = await pagoWebpay(lista)
    const formualrioAEnviar = document.getElementById('formIrAPagar')
    formualrioAEnviar.action = response.url
    document.getElementById('hiddenWebpayToken').value = response.token
     formualrioAEnviar.submit()
  };

  return (
    <div style={{ padding: "2rem", marginTop: "90px" }}>
      <ResponsiveAppBar />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {cart.length === 0 ? (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", marginTop: "2rem" }}
            >
              El carrito está vacío.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {cart.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      boxShadow: 2,
                      padding: "1rem",
                      marginBottom: "1rem",
                      borderRadius: "8px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.imagenUrl}
                      alt={item.nombre}
                      sx={{
                        height: "80px",
                        objectFit: "cover",
                        width: "80px",
                        marginRight: "1rem",
                      }}
                    />
                    <CardContent
                      sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                    >
                      <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
                        {item.nombre}
                      </Typography>
                      <Typography variant="body1">
                        Precio: $
                        {new Intl.NumberFormat("es-ES").format(item.precio)}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "1rem",
                        }}
                      >
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleCantidadChange(e, item)}
                          inputProps={{ min: 1, max: item.stock }}
                          sx={{ width: "60px", marginRight: "1rem" }}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => removeFromCart(item.id)}
                          sx={{
                            backgroundColor: "black",
                            color: "white",
                            "&:hover": { backgroundColor: "darkgrey" },
                          }}
                        >
                          Eliminar
                        </Button>
                      </Box>
                      <Typography variant="h6" sx={{ marginTop: "1rem" }}>
                        Subtotal: $
                        {new Intl.NumberFormat("es-ES").format(
                          item.precio * item.quantity
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: "8px" }}>
            <CardContent>
              <Typography variant="h6">Resumen de la compra</Typography>
              <Typography variant="body1">Productos: {totalItems}</Typography>
              <Typography variant="body1">
                Total: ${new Intl.NumberFormat("es-ES").format(total)}
              </Typography>
              <Button
                onClick={createPayment}
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginTop: "1rem",
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": { backgroundColor: "darkgrey" },
                }}
              >
                Continuar compra
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <form id='formIrAPagar' method='POST'>
        <input name='token_ws' type='hidden' id='hiddenWebpayToken'></input>
      </form>
    </div>
  );
};

export default Cart;
