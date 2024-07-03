import React, { useState, useEffect } from 'react';
import { getAllProductos, updateProductById } from '../services/api';
import { Dropdown, Modal, Button, Form, Alert } from 'react-bootstrap';

const EditProduct = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagenUrl: '',
    idCategoria: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const categorias = [
    { id: 8, name: "Pastel sin gluten" },
    { id: 9, name: "Pastel Sin Azucar" },
    {id: 10, name: 'Galletas Sin Gluten'},
    {id: 11, name: 'Torta Sin Lácteos'},
    {id: 12, name: 'Tartas Sin Azúcar'},
    {id: 13, name: 'Magdalenas Sin Gluten'},
    {id: 14, name: 'Pan de Avena Sin Azúcar'},
    {id: 15, name: 'Budín Sin Azúcar'},
    {id: 16, name: 'Brownies Sin Gluten'},
    {id: 17, name: 'Cupcakes Sin Azúcar'},
    {id: 18, name: 'Empanadas Sin Gluten'},
    {id: 19, name: 'Bizcocho Sin Gluten'},
  ];

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosList = await getAllProductos();
        console.log('Lista de productos:', productosList);
        setProductos(productosList);
      } catch (error) {
        console.error('Error obteniendo productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleProductoSelect = (producto) => {
    setSelectedProducto(producto);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      imagenUrl: producto.imagenUrl,
      idCategoria: producto.idCategoria
    });
    setShowEditModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoriaSelect = (categoria) => {
    setFormData({ ...formData, idCategoria: categoria.id });
  };

  const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/i;

  const isValidUrl = (url) => {
    return urlRegex.test(url);
  };


  const handleEditProduct = async () => {
    const { nombre, descripcion, precio, stock, imagenUrl, idCategoria } = formData;

    if (!precio) {
      setErrorMessage("Ingrese precio")
      return
    }

    if (precio && precio < 1000) {
      setErrorMessage("Valor menor al permitido")
      return
    }

    if (!stock) {
      setErrorMessage("Ingrese stock")
      return
    }

    if (stock && stock < 0) {
      setErrorMessage("Valor no permitido")
      return
    }

    const isNombreRepetido = productos.some(producto => producto.id !== selectedProducto.id && producto.nombre === nombre);
    if (isNombreRepetido) {
      setErrorMessage("Artículo existente");
      return;
    }

    if (!nombre || !nombre.trim() || !descripcion || !descripcion.trim() || !imagenUrl.trim()) {
      setErrorMessage('Todos los campos son requeridos y no pueden estar vacíos');
      return;
    }

    if (!isValidUrl(imagenUrl)) {
      setErrorMessage('La URL de la imagen no es válida');
      return;
    }

    const textRegex = /[a-zA-Z ]/

    const isValidText = (text) => {
     return textRegex.test(text);
};

    if (!isValidText(nombre) || !isValidText(descripcion)) {
      setErrorMessage('Los campos no deben contener caracteres especiales como <, >, !');
      return;
    }
    try {
      await updateProductById(selectedProducto.id, nombre, precio, descripcion, stock, imagenUrl, idCategoria);
      const updatedProductosList = await getAllProductos();
      setProductos(updatedProductosList);
      setSelectedProducto(null);
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagenUrl: '',
        idCategoria: ''
      });
      setShowEditModal(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Error actualizando el producto:', error);
      setErrorMessage('Error actualizando el producto. Por favor, intente nuevamente.');
    }
  };

  const handleCloseEditModal = () => {
    setSelectedProducto(null);
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      imagenUrl: '',
      idCategoria: ''
    });
    setShowEditModal(false);
    setErrorMessage('');
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowEditModal(true)}>
        Editar Producto
      </Button>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {selectedProducto ? selectedProducto.nombre : 'Seleccionar Producto'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {productos.map((producto) => (
                <Dropdown.Item key={producto.id} onClick={() => handleProductoSelect(producto)}>
                  {producto.nombre}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {selectedProducto && (
            <Form>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleFormChange} required/>
              </Form.Group>
              <Form.Group controlId="formDescripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" name="descripcion" value={formData.descripcion} onChange={handleFormChange} required/>
              </Form.Group>
              <Form.Group controlId="formPrecio">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" name="precio" value= {new Intl.NumberFormat('es-CL').format(formData.precio)} onChange={handleFormChange} required/>
              </Form.Group>
              <Form.Group controlId="formStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" name="stock" value={formData.stock} onChange={handleFormChange} required/>
              </Form.Group>
              <Form.Group controlId="formImagenUrl">
                <Form.Label>URL de la Imagen</Form.Label>
                <Form.Control type="text" name="imagenUrl" value={formData.imagenUrl} onChange={handleFormChange} required/>
              </Form.Group>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-categoria">
                  {formData.idCategoria ? categorias.find(cat => cat.id === formData.idCategoria)?.name : 'Seleccionar Categoría'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categorias.map((categoria) => (
                    <Dropdown.Item key={categoria.id} onClick={() => handleCategoriaSelect(categoria)}>
                      {categoria.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEditProduct}>
            Guardar Cambios
          </Button>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProduct;
