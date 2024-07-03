import React, { useState } from "react";
import { createUser, getUsers } from "../services/api";
import { Form, Button, Alert, Modal, Dropdown } from "react-bootstrap";

const CreateUser = () => {
  const initialFormData = {
    nombre: "",
    correo: "",
    contrasena: "",
    apaterno: "",
    amaterno: "",
    idRol: "",
  };

  const roles = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Usuario" },
  ];

  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData((prevData) => ({
      ...prevData,
      idRol: role.id,
    }));
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(name);
  };
  

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.correo);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, correo, contrasena, apaterno, amaterno, idRol } = formData;

    const userList = await getUsers();
    if (userList.some(usuario => usuario.correo === correo)) {
      setErrorMessage("Correo existente");
      return;
    }

    if (nombre.length < 3) {
      setErrorMessage("El nombre es muy corto");
      return;
    }

    if (!validateName(nombre)) {
      setErrorMessage("El nombre solo puede contener letras y espacios");
      return;
    }
  
    if (!validateName(apaterno)) {
      setErrorMessage("El apellido paterno solo puede contener letras y espacios");
      return;
    }
  
    if (!validateName(amaterno)) {
      setErrorMessage("El apellido materno solo puede contener letras y espacios");
      return;
    }
    
    if (
      !nombre.trim() ||
      !correo.trim() ||
      !contrasena.trim() ||
      !apaterno.trim() ||
      !amaterno.trim() ||
      !idRol
    ) {
      setErrorMessage("No pueden haber espacios en blanco");
      return;
    }

    if (!validateEmail()) {
      console.log("Correo no válido:", correo);
      setErrorMessage("El correo no cumple con el formato");
      return;
    }

    if (contrasena.length < 8) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      const newUser = await createUser(
        nombre,
        correo,
        contrasena,
        apaterno,
        amaterno,
        idRol
      );
      console.log("User created:", newUser);
      setErrorMessage("");
      setShowModal(false);
      setFormData(initialFormData);
      setSelectedRole(null); 
    } catch (error) {
      console.error("Error creating user:", error.message);
      setErrorMessage("Error creating user. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setShowModal(true)}>
        Crear Usuario
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Usuario</Modal.Title>
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
            <Form.Group controlId="formApaterno">
              <Form.Label>Apellido Paterno:</Form.Label>
              <Form.Control
                type="text"
                name="apaterno"
                value={formData.apaterno}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAmaterno">
              <Form.Label>Apellido Materno:</Form.Label>
              <Form.Control
                type="text"
                name="amaterno"
                value={formData.amaterno}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCorreo">
              <Form.Label>Correo:</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errorMessage} {/* Mostrar mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formContrasena">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                name="contrasena"
                value={formData.contrasena}
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
                {selectedRole ? selectedRole.name : "Seleccionar Rol"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {roles.map((role) => (
                  <Dropdown.Item
                    key={role.id}
                    onClick={() => handleRoleSelect(role)}
                  >
                    {role.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button
              style={{ marginTop: "10px" }}
              variant="primary"
              type="submit"
            >
              Crear Usuario
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

export default CreateUser;
