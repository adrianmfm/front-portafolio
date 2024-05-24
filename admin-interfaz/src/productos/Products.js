import React, { useState, useEffect } from "react";
import { getAllProductos } from "../services/api";
import { Table } from "react-bootstrap";

const Products = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const productosData = await getAllProductos();
        setProductos(productosData);
      } catch (error) {
        console.error("Error fetching productos", error.message);
      }
    }

    fetchProductos();
  }, []);

  return (
    <div className="mt-4">
      <div style={{ textAlign: "center" }}>
        <h1>Lista de Productos</h1>
      </div>
      <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td>
                  {producto.imagenUrl && (
                    <img src={producto.imagenUrl} alt={producto.nombre} style={{ maxWidth: "100px", maxHeight: '100px' }} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Products;
