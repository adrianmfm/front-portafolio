import { useLocation, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import CartContext from "../carrito/CarritoContext";
import { getSellDetail } from "../services/api";

const PaginaExito = () => {
  const { clearCart } = useContext(CartContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const monto = searchParams.get("monto");
  const fechaTransaccion = searchParams.get("fechaTransaccion");
  const codigoAutorizacion = searchParams.get("codigoAutorizacion");
  const idVenta = searchParams.get("ventaId");
  const [hover, setHover] = useState(false);
  const [productosVendidos, setProductosVendidos] = useState([]);
  const [tipoEntrega, setTipoEntrega] = useState(null);
  const [detailsLoaded, setDetailsLoaded] = useState(false);

  useState(() => {
    clearCart();
  }, []);

  useEffect(() => {
    if (idVenta && !detailsLoaded) {
      fetchSellDetail(idVenta);
    }
  }, [idVenta, detailsLoaded]);

  const fetchSellDetail = async (id) => {
    try {
      const data = await getSellDetail(id);
      setProductosVendidos(data.productos);
      setTipoEntrega(data.type);
      setDetailsLoaded(true); // Marcar como cargado después de la primera carga
    } catch (error) {
      console.error("Error al obtener los detalles de la venta:", error);
    }
  };

  const formatearFecha = (fecha) => {
    const fechaObjeto = new Date(fecha);
    return fechaObjeto.toLocaleString();
  };

  return (
    <div style={styles.contenedor}>
      <img
        src="/imagenes/logo-olivias.jpeg"
        alt="Logo Olivias"
        style={styles.logo}
      />
      <div style={styles.boleta}>
        <h1 style={styles.titulo}>¡Pago Exitoso!</h1>
        <hr style={styles.linea} />
        {productosVendidos.length > 0 && (
          <div style={styles.productos}>
            <h2>Productos Vendidos:</h2>
            <ul style={styles.listaProductos}>
              {productosVendidos.map((producto) => (
                <li key={producto.name} style={styles.itemProducto}>
                  {producto.url && (
                    <img
                      src={producto.url}
                      alt={producto.name}
                      style={styles.imagenProducto}
                    />
                  )}
                  <div>
                    {producto.name} - Cantidad: {producto.quantity} - Precio: $
                    {producto.price}
                  </div>
                </li>
              ))}
              <div>
                <p>
                  <strong>Fecha de Transacción:</strong>{" "}
                  {fechaTransaccion ? formatearFecha(fechaTransaccion) : ""}
                </p>
                <p>
                  <strong>Código de Autorización:</strong> {codigoAutorizacion}
                </p>
                <p>
                  <strong>Monto total:</strong> ${monto}
                </p>
              </div>
            </ul>
          </div>
        )}
        {tipoEntrega === 1 && (
          <p style={styles.entregaMensaje}>
            Será contactado para la entrega de su producto.
          </p>
        )}
        {tipoEntrega === 2 && (
          <p style={styles.retiroMensaje}>
            Retiro disponible en las próximas 2 horas.
          </p>
        )}
        <Link
          to="/"
          style={
            hover ? { ...styles.boton, ...styles.botonHover } : styles.boton
          }
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
};

const styles = {
  contenedor: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: "20px",
  },
  logo: {
    marginBottom: "30px",
    borderRadius: "50%",
    width: "150px",
    height: "150px",
  },
  boleta: {
    backgroundColor: "#fff",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
    marginBottom: "20px",
  },
  titulo: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#343a40",
  },
  linea: {
    border: "none",
    borderTop: "1px dashed #999",
    marginBottom: "15px",
  },
  boton: {
    display: "block",
    backgroundColor: "black",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    textAlign: "center",
    textDecoration: "none",
    marginTop: "20px",
    transition: "background-color 0.3s",
  },
  botonHover: {
    backgroundColor: "#0056b3",
  },
  productos: {
    marginTop: "20px",
    textAlign: "left",
  },
  listaProductos: {
    listStyleType: "none",
    padding: 0,
  },
  itemProducto: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  imagenProducto: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    marginRight: "10px",
    borderRadius: "5px",
  },
  entregaMensaje: {
    marginTop: "15px",
    fontSize: "16px",
    color: "#28a745",
  },
  retiroMensaje: {
    marginTop: "15px",
    fontSize: "16px",
    color: "#ff4d4f",
  },
};

export default PaginaExito;
