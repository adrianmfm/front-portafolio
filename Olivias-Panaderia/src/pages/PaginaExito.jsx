import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';

const PaginaExito = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const monto = searchParams.get('monto');
  const fechaTransaccion = searchParams.get('fechaTransaccion');
  const codigoAutorizacion = searchParams.get('codigoAutorizacion');
  const [hover, setHover] = useState(false);

  const formatearFecha = (fecha) => {
    const fechaObjeto = new Date(fecha);
    return fechaObjeto.toLocaleString();
  };

  return (
    <div style={styles.contenedor}>
      <img src="/imagenes/logo-olivias.jpeg" alt="Logo Olivias" style={styles.logo} />
      <div style={styles.boleta}>
        <h1 style={styles.titulo}>¡Pago Exitoso!</h1>
        <hr style={styles.linea} />
        <p><strong>Monto:</strong> ${monto}</p>
        <p><strong>Fecha de Transacción:</strong> {fechaTransaccion ? formatearFecha(fechaTransaccion) : ''}</p>
        <p><strong>Código de Autorización:</strong> {codigoAutorizacion}</p>
        <Link
          to="/"
          style={hover ? { ...styles.boton, ...styles.botonHover } : styles.boton}
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
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'center', // Centrar verticalmente
    alignItems: 'center', // Centrar horizontalmente
    backgroundColor: '#fff',
    padding: '20px', // Agregar padding para un mejor espacio alrededor
  },
  logo: {
    marginBottom: '90px',
    borderRadius: '50%',
    width: '200px',
    height: '200px'
  },
  boleta: {
    backgroundColor: '#fff',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    marginBottom: '20px',
  },
  titulo: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#343a40',
  },
  linea: {
    border: 'none',
    borderTop: '1px dashed #999',
    marginBottom: '15px',
  },
  boton: {
    display: 'block',
    backgroundColor: 'black',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    marginTop: '15px',
    transition: 'background-color 0.3s',
  },
  botonHover: {
    backgroundColor: '#0056b3',
  },
  seguridad: {
    textAlign: 'center',
    marginTop: '20px',
  },
  webpayLogo: {
    maxWidth: '150px',
    marginTop: '10px',
  },
};

export default PaginaExito;
