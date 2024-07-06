import { Link } from 'react-router-dom';
import { useState } from 'react';

const PaginaError = () => {
  //const location = useLocation();
  //const searchParams = new URLSearchParams(location.search);
  //const motivo = searchParams.get('motivo');
  //const ordenCompra = searchParams.get('ordenCompra');
  const [hover, setHover] = useState(false);

  return (
    <div style={styles.contenedor}>
        <img src="/imagenes/logo-olivias.jpeg" alt="Logo Olivias" style={styles.logo} />
      <div style={styles.error}>
        <h1 style={styles.titulo}>¡Pago Fallido!</h1>
        <hr style={styles.linea} />
        <p><strong>Vuelve a intentarlo</strong> {}</p>
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
  error: {
    backgroundColor: '#fff',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    margin: '20px auto', // Ajusta el margen para centrar verticalmente
  },
  titulo: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '10px',
  },
  linea: {
    border: 'none',
    borderTop: '1px dashed #999',
    marginBottom: '15px',
  },
  logo: {
    marginBottom: '90px',
    borderRadius: '50%',
    width: '200px',
    height: '200px'
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
  
};

export default PaginaError;
