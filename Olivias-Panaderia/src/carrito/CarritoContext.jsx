import React, { createContext, useState } from 'react';


export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto, cantidad) => {
    setCarrito([...carrito, { ...producto, cantidad }]);
  };

  const obtenerCantidadTotal = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, obtenerCantidadTotal }}>
      {children}
    </CarritoContext.Provider>
  );
};
