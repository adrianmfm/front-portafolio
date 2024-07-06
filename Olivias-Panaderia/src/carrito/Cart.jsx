import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  useMediaQuery,
  useTheme,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ResponsiveAppBar from "../AppBar";
import { pagoWebpay } from "../services/api";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const { cart, removeFromCart, updateCartItem } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState("retiro");
  const [deliveryDetails, setDeliveryDetails] = useState({
    correo: "",
    direccion: "",
    comuna: "",
    ciudad: "",
    numero: "",
    nombre: ""
  });
  const [errorCorreo, setErrorCorreo] = useState(false);
  const [errorDireccion, setErrorDireccion] = useState(false);
  const [errorComuna, setErrorComuna] = useState(false);
  const [errorTelefono, setErrorTelefono] = useState(false);
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorCorreoMensaje, setErrorCorreoMensaje] = useState("");
  const [errorTelefonoMensaje, setErrorTelefonoMensaje] = useState("");
  const [errorNombreMensaje, setErrorNombreMensaje] = useState("");

  const comunas = [
    "Cerro Navia",
    "Conchalí",
    "El Bosque",
    "Estación Central",
    "Huechuraba",
    "Independencia",
    "La Cisterna",
    "La Florida",
    "La Granja",
    "La Pintana",
    "La Reina",
    "Las Condes",
    "Lo Barnechea",
    "Lo Espejo",
    "Lo Prado",
    "Macul",
    "Maipú",
    "Ñuñoa",
    "Pedro Aguirre Cerda",
    "Peñalolén",
    "Providencia",
    "Pudahuel",
    "Quilicura",
    "Quinta Normal",
    "Recoleta",
    "Renca",
    "San Bernardo",
    "San Joaquín",
    "San José de Maipo",
    "San Miguel",
    "San Ramón",
    "Santiago",
    "Vitacura",
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  const handleDeliveryDetailsChange = (event) => {
    const { name, value } = event.target;
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    console.log(name, value)
    if (name === "correo") {
      setErrorCorreo(!validateEmail(value));
      setErrorCorreoMensaje(!validateEmail(value) ? "Correo inválido" : "");
    } else if (name === "direccion") {
      setErrorDireccion(value.trim() === "");
    } else if (name === "comuna") {
      setErrorComuna(value.trim() === "");
    } else if (name === "numero") {
      setErrorTelefono(!validateTelefono(value));
      setErrorTelefonoMensaje(!validateTelefono(value) ? "Teléfono inválido" : "");
    } else if (name === "nombre") {
      setErrorNombre(!validateNombre(value));
      setErrorNombreMensaje(!validateNombre(value) ? "Nombre inválido" : "");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateTelefono = (numero) => {
    console.log(numero)
    const numeroRegex = /^\d{9}$/;
    return numeroRegex.test(numero);
  };

  const validateNombre = (numero) => {
    console.log(numero)
    const numeroRegex = /^[a-zA-Z\s]+$/;
    return numeroRegex.test(numero);
  };

  const createPayment = async () => {
    let valid = true;
  
    if (!deliveryDetails.correo || !validateEmail(deliveryDetails.correo)) {
      setErrorCorreo(true);
      setErrorCorreoMensaje("Correo inválido");
      valid = false;
    }
    if (!deliveryDetails.numero.trim()) {
      setErrorTelefono(true);
      valid = false;
    }
    if (!deliveryDetails.nombre.trim()) {
      setErrorNombre(true);
      valid = false;
    }
  
    if (deliveryOption === "despacho") {
      if (!deliveryDetails.direccion.trim()) {
        setErrorDireccion(true);
        valid = false;
      }
      if (!deliveryDetails.comuna.trim()) {
        setErrorComuna(true);
        valid = false;
      }
      if (!deliveryDetails.numero.trim()) {
        setErrorTelefono(true);
        valid = false;
      }
      if (!deliveryDetails.nombre.trim()) {
        setErrorNombre(true);
        valid = false;
      }
    }
  
    if (!valid) return;
  
    setLoading(true); // Set loading to true when starting the payment process
    const lista = cart.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));
  
    const despacho = {
      idTipoDespacho: deliveryOption === "despacho" ? 1 : 2,
      correo: deliveryDetails.correo,
      numero: deliveryDetails.numero,
      nombre: deliveryDetails.nombre,
      direccion: deliveryOption === "despacho" ? deliveryDetails.direccion : undefined,
      comuna: deliveryOption === "despacho" ? deliveryDetails.comuna : undefined,
      ciudad: deliveryOption === "despacho" ? deliveryDetails.ciudad : undefined,
    };
  
    const response = await pagoWebpay(lista, despacho);
    const formularioAEnviar = document.getElementById("formIrAPagar");
    formularioAEnviar.action = response.url;
    document.getElementById("hiddenWebpayToken").value = response.token;
    formularioAEnviar.submit();
    //setLoading(false); // Set loading to false after the payment process
  };
  

  return (
    <div style={{ padding: "2rem", marginTop: "90px" }}>
      <ResponsiveAppBar />
      {loading ? (
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
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {cart.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "5rem",
                  alignContent: "center",
                  marginLeft: isMobile ? "1px" : "500px",
                }}
              >
                <Typography variant="h6">El carrito está vacío.</Typography>
                <Typography variant="body1" sx={{ marginTop: "1rem" }}>
                  Te invitamos a navegar por nuestro catálogo de productos
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/catalogo"
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": { backgroundColor: "darkgrey" },
                  }}
                >
                  Ver Productos
                </Button>
              </div>
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
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ marginBottom: "0.5rem" }}
                        >
                          {item.nombre}
                        </Typography>
                        <Typography variant="body1">
                          Precio: $
                          {new Intl.NumberFormat("es-CL").format(item.precio)}
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
                          {new Intl.NumberFormat("es-CL").format(
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
          {totalItems > 0 && (
            <Grid item xs={12} md={4}>
              <Card sx={{ boxShadow: 3, borderRadius: "8px" }}>
                <CardContent>
                  <Typography variant="h6">Resumen de la compra</Typography>
                  <Typography variant="body1">
                    Productos: {totalItems}
                  </Typography>
                  <Typography variant="body1">
                    Total: ${new Intl.NumberFormat("es-CL").format(total)}
                  </Typography>
                  <Box sx={{ marginTop: "1rem" }}>
                    <Typography variant="body1">
                      Opciones de entrega:
                    </Typography>
                    <RadioGroup
                      value={deliveryOption}
                      onChange={handleDeliveryOptionChange}
                    >
                      <FormControlLabel
                        value="retiro"
                        control={<Radio />}
                        label="Retiro en tienda"
                      />
                      {deliveryOption === "retiro" && (
                        <Typography variant="body2" color="textSecondary">
                          *Listo para retiro en las próximas 2 horas.
                        </Typography>
                      )}

                      <FormControlLabel
                        value="despacho"
                        control={<Radio />}
                        label="Despacho a domicilio"
                      />
                    </RadioGroup>
                  </Box>
                  <Box sx={{ marginTop: "1rem" }}>
                  <TextField
                      label="Nombre"
                      name="nombre"
                      value={deliveryDetails.nombre}
                      onChange={handleDeliveryDetailsChange}
                      fullWidth
                      sx={{ marginBottom: "1rem" }}
                      required
                      error={errorNombre}
                      helperText={errorNombre ? errorNombreMensaje : ""}
                    />
                    <TextField
                      label="Correo"
                      name="correo"
                      value={deliveryDetails.correo}
                      onChange={handleDeliveryDetailsChange}
                      fullWidth
                      sx={{ marginBottom: "1rem" }}
                      required
                      error={errorCorreo}
                      helperText={errorCorreo ? errorCorreoMensaje : ""}
                    />
                    <TextField
                      label="Teléfono"
                      name="numero"
                      value={deliveryDetails.numero}
                      onChange={handleDeliveryDetailsChange}
                      fullWidth
                      sx={{ marginBottom: "1rem" }}
                      required
                      error={errorTelefono}
                      helperText={errorTelefono ? errorTelefonoMensaje : ""}
                    />
                    {deliveryOption === "despacho" && (
                      <Box>
                        <TextField
                          label="Dirección"
                          name="direccion"
                          value={deliveryDetails.direccion}
                          onChange={handleDeliveryDetailsChange}
                          fullWidth
                          sx={{ marginBottom: "1rem" }}
                          required
                          error={errorDireccion}
                          helperText={
                            errorDireccion ? "Dirección requerida" : ""
                          }
                        />
                        <FormControl
                          fullWidth
                          sx={{ marginBottom: "1rem" }}
                          required
                          error={errorComuna}
                        >
                          <InputLabel id="comuna-label">Comuna</InputLabel>
                          <Select
                            labelId="comuna-label"
                            name="comuna"
                            value={deliveryDetails.comuna}
                            onChange={handleDeliveryDetailsChange}
                          >
                            {comunas.map((comuna) => (
                              <MenuItem key={comuna} value={comuna}>
                                {comuna}
                              </MenuItem>
                            ))}
                          </Select>
                          {errorComuna && (
                            <Typography color="error">
                              Comuna requerida
                            </Typography>
                          )}
                        </FormControl>

                        <Typography variant="body2" color="textSecondary">
                          *El costo del envío es de $5.000 pesos.
                        </Typography>
                      </Box>
                    )}
                  </Box>
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
          )}
        </Grid>
      )}
      <form id="formIrAPagar" method="POST">
        <input name="token_ws" type="hidden" id="hiddenWebpayToken"></input>
      </form>
    </div>
  );
};

export default Cart;
