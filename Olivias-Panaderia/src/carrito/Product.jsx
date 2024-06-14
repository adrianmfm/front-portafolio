/* eslint-disable react/prop-types */
import  { useContext } from 'react';
import CartContext from '../carrito/CarritoContext';

const ProductItem = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);

  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h2>{product.nombre}</h2>
      <p>Precio: ${product.precio}</p>
      <button onClick={handleAddToCart} style={{ backgroundColor: 'black', color: 'white', padding: '0.5rem 1rem', cursor: 'pointer' }}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductItem;

