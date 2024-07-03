import React, { useState } from "react";
import { createProduct, getAllProductos } from "../services/api";
import { Form, Button, Alert, Modal, Dropdown } from "react-bootstrap";

const CreateProduct = () => {
  const initialFormData = {
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagenUrl: "",
    idCategoria: "",
  };

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

  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoriaSelect = (categoria) => {
    setSelectedCategoria(categoria);
    setFormData((prevData) => ({
      ...prevData,
      idCategoria: categoria.id,
    }));
  };

  const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/i;

  const isValidUrl = (url) => {
    return urlRegex.test(url);
  };

  const textRegex = /[a-zA-Z ]/

  const isValidText = (text) => {
   return textRegex.test(text);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, descripcion, precio, stock, imagenUrl, idCategoria } = formData;

    if (
      !nombre.trim() ||
      !descripcion.trim() ||
      !precio.trim() ||
      !stock.trim() ||
      !imagenUrl.trim() ||
      !idCategoria
    ) {
      setErrorMessage("No pueden haber espacios en blanco");
      return;
    }

    const productosList = await getAllProductos();
    if (productosList.some(producto => producto.nombre === nombre)) {
      setErrorMessage("Artículo existente");
      return;
    }

    if (!isValidText(nombre) || !isValidText(descripcion)) {
      setErrorMessage('Los campos no deben contener caracteres especiales como <, >, !');
      return;
    }

    if (!precio) {
      setErrorMessage("Ingrese precio")
      return
    }

    if (precio && precio < 1000) {
      setErrorMessage("Valor menor al permitido")
      return
    }

    if (!isValidUrl(imagenUrl)) {
      setErrorMessage('La URL de la imagen no es válida');
      return;
    }

    if(nombre.length <3){
      setErrorMessage('El nombre es muy corto');
      return
    }

    try {
      const newProduct = await createProduct(
        nombre,
        precio,
        descripcion,
        stock,
        imagenUrl,
        idCategoria
      );
      console.log("Producto creado:", newProduct);
      setErrorMessage("");
      setShowModal(false);
      setFormData(initialFormData);
      setSelectedCategoria(null); // Resetear la categoría seleccionada
    } catch (error) {
      console.error("Error creando producto:", error.message);
      setErrorMessage("Error creando producto. Por favor, intente nuevamente.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setShowModal(true)}>
        Crear Producto
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio:</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formStock">
              <Form.Label>Stock:</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImagenUrl">
              <Form.Label>URL de la Imagen:</Form.Label>
              <Form.Control
                type="text"
                name="imagenUrl"
                value={formData.imagenUrl}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Dropdown>
              <Dropdown.Toggle
                style={{ marginTop: "10px" }}
                variant="primary"
                id="dropdown-basic"
              >
                {selectedCategoria ? selectedCategoria.name : "Seleccionar Categoría"}
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
            <Button
              style={{ marginTop: "10px" }}
              variant="primary"
              type="submit"
            >
              Crear Producto
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateProduct;
