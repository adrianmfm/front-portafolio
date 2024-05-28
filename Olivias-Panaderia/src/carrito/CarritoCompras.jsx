import React, { useContext } from 'react';
import { CarritoContext } from './CarritoContext';

const CarritoCompras = () => {
  // Usamos el contexto del carrito
  const { carrito } = useContext(CarritoContext);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {carrito.map((producto, index) => (
          <li key={index}>{producto.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default CarritoCompras;
