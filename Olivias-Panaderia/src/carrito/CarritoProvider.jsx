export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const agregarProducto = (producto) => {
      setCarrito((prevCarrito) => [...prevCarrito, producto]);
    };
    return (
      <CarritoContext.Provider value={{ carrito, agregarProducto }}>
        {children}
      </CarritoContext.Provider>
    );
  };
  