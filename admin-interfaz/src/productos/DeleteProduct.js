import React, { useState, useEffect } from 'react';
import { getAllProductos, deleteProduct } from '../services/api';
import { Button, Modal, Dropdown } from 'react-bootstrap';

const DeleteProduct = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productList = await getAllProductos();
        setProductos(productList);
      } catch (error) {
        console.error('Error obteniendo productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== productId));
      setSelectedProduct(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  };

  const handleProductSelect = (producto) => {
    setSelectedProduct(producto);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedProduct(null);
    setShowDeleteModal(false);
  };

  return (
    <>
      <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
        Eliminar Producto
      </Button>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {selectedProduct ? selectedProduct.nombre : 'Seleccionar Producto'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {productos.map((producto) => (
                <Dropdown.Item key={producto.id} onClick={() => handleProductSelect(producto)}>
                  {producto.nombre}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {selectedProduct && (
            <Button style={{marginTop: '10px'}} variant="danger" size="sm" onClick={() => handleDeleteProduct(selectedProduct.id)}>
              Confirmar Eliminar
            </Button>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteProduct;
