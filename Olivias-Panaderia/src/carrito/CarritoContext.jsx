import React, { createContext, useState } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto, cantidad = 1) => {
    const productoExistente = carrito.find(p => p.id === producto.id);
    if (productoExistente) {
      setCarrito(carrito.map(p =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad + cantidad } : p
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad }]);
    }
  };

  const eliminarProducto = (id) => {
    setCarrito(carrito.filter(p => p.id !== id));
  };

  const incrementarCantidad = (id) => {
    setCarrito(carrito.map(p =>
      p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
    ));
  };

  const decrementarCantidad = (id) => {
    setCarrito(carrito.map(p =>
      p.id === id ? { ...p, cantidad: Math.max(p.cantidad - 1, 1) } : p
    ));
  };

  const obtenerCantidadTotal = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, eliminarProducto, incrementarCantidad, decrementarCantidad, obtenerCantidadTotal }}>
      {children}
    </CarritoContext.Provider>
  );
};
