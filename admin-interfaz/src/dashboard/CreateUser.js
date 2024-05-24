import React, { useState } from 'react';
import { createUser } from '../services/api';
import { Form, Button, Alert, Modal, Dropdown } from 'react-bootstrap';

const CreateUser = () => {
  const initialFormData = {
    nombre: '',
    correo: '',
    contrasena: '',
    apaterno: '',
    amaterno: '', 
    idRol: ''
  };

  const roles = [
    { id: 1, name: 'Administrador' },
    { id: 2, name: 'Usuario' }
  ];

  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData((prevData) => ({
      ...prevData,
      idRol: role.id
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, correo, contrasena, apaterno, amaterno, idRol } = formData;
    
    if (!nombre.trim() || !correo.trim() || !contrasena.trim() || !apaterno.trim() || !amaterno.trim() || !idRol) {
      setErrorMessage('No pueden haber espacios en blanco');
      return;
    }

    if (contrasena.length < 8) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres');
      return;
    }
  
    try {
      const newUser = await createUser(nombre, correo, contrasena, apaterno, amaterno, idRol);
      console.log('User created:', newUser);
      setErrorMessage('');
      setShowModal(false);
      setFormData(initialFormData);
      setSelectedRole(null); // Resetear el rol seleccionado
    } catch (error) {
      console.error('Error creating user:', error.message);
      setErrorMessage('Error creating user. Please try again.');
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
              <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formApaterno">
              <Form.Label>Apellido Paterno:</Form.Label>
              <Form.Control type="text" name="apaterno" value={formData.apaterno} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formAmaterno">
              <Form.Label>Apellido Materno:</Form.Label>
              <Form.Control type="text" name="amaterno" value={formData.amaterno} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formCorreo">
              <Form.Label>Correo:</Form.Label>
              <Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formContrasena">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
            </Form.Group>
            <Dropdown>
              <Dropdown.Toggle style={{marginTop: '10px'}} variant="primary" id="dropdown-basic">
                {selectedRole ? selectedRole.name : 'Seleccionar Rol'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {roles.map((role) => (
                  <Dropdown.Item key={role.id} onClick={() => handleRoleSelect(role)}>
                    {role.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button style={{marginTop: '10px'}} variant="primary" type="submit">
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
