import React, { useState, useEffect } from "react";
import {
  getAllProductos,
  updateProductById,
  deleteProduct,
} from "../services/api";
import { Table, Button, Modal, Form, Dropdown, Alert, FormControl } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";


const Products = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagenUrl: "",
    idCategoria: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const categorias = [
    { id: 1, name: "Sin azúcar" },
    { id: 2, name: "Sin Lácteos" },
    { id: 3, name: "Sin Gluten" },
    { id: 4, name: "Sin Nueces" },
 
  ];

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosList = await getAllProductos();
        setProductos(productosList);
      } catch (error) {
        console.error("Error obteniendo productos:", error);
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
      idCategoria: producto.idCategoria,
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

  const handleEditProduct = async () => {
    const { nombre, descripcion, precio, stock, imagenUrl, idCategoria } =
      formData;

    if (
      !precio ||
      precio < 1000 ||
      stock < 0 ||
      !nombre.trim() ||
      !descripcion.trim() ||
      !imagenUrl.trim()
    ) {
      setErrorMessage(
        "Todos los campos son requeridos y no pueden estar vacíos"
      );
      return;
    }

    const isNombreRepetido = productos.some(
      (producto) =>
        producto.id !== selectedProducto.id && producto.nombre === nombre
    );
    if (isNombreRepetido) {
      setErrorMessage("Artículo existente");
      return;
    }

    try {
      await updateProductById(
        selectedProducto.id,
        nombre,
        precio,
        descripcion,
        stock,
        imagenUrl,
        idCategoria
      );
      const updatedProductosList = await getAllProductos();
      setProductos(updatedProductosList);
      setShowEditModal(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Error actualizando el producto:", error);
      setErrorMessage(
        "Error actualizando el producto. Por favor, intente nuevamente."
      );
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProductos((prevProductos) =>
        prevProductos.filter((producto) => producto.id !== productId)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-4">
      <style>
        {`
          @media (max-width: 768px) {
            .mobile-block {
              display: block;
              width: 100%;
              padding: 16px;
            }
          }
        `}
      </style>
      <div style={{ textAlign: "center" }}>
        <h1>Lista de Productos</h1>
        <FormControl
          type="text"
          placeholder="Buscar Producto"
          className="mr-sm-2"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div
        className="table-responsive"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos
            .sort((a, b) => b.stock - a.stock)
            .map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>${new Intl.NumberFormat('es-CL').format(producto.precio)}</td>
                <td>{producto.stock}</td>
                <td>
                  {producto.imagenUrl && (
                    <img
                      src={producto.imagenUrl}
                      alt={producto.nombre}
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  )}
                </td>
                <td className="mobile-block" style={{ width: '135px', padding: '16px' }}>
                  <Button
                    variant="warning"
                    onClick={() => handleProductoSelect(producto)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    style={{ marginLeft: '10px' }}
                    variant="danger"
                    onClick={() => {
                      setSelectedProducto(producto);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for editing product */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={new Intl.NumberFormat('es-CL').format(formData.precio)}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImagenUrl">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagenUrl"
                value={formData.imagenUrl}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-categoria">
                {formData.idCategoria
                  ? categorias.find((cat) => cat.id === formData.idCategoria)
                      ?.name
                  : "Seleccionar Categoría"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categorias.map((categoria) => (
                  <Dropdown.Item
                    key={categoria.id}
                    onClick={() => handleCategoriaSelect(categoria)}
                  >
                    {categoria.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEditProduct}>
            Guardar Cambios
          </Button>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for deleting product */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que desea eliminar el producto {selectedProducto?.nombre}
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => handleDeleteProduct(selectedProducto.id)}
          >
            Confirmar Eliminar
          </Button>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
