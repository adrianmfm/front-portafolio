import React, { useState, useEffect } from 'react';
import { getUsers, updateUserById } from '../services/api';
import { Dropdown, Modal, Button, Form, Alert } from 'react-bootstrap';

const EditUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    apaterno: '',
    amaterno: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        console.log('Lista de usuarios:', userList);
        if (userList && userList.length > 0) {
          setUsers(userList);
        }
      } catch (error) {
        console.error('Error obteniendo usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setFormData({
      nombre: user.nombre,
      correo: user.correo,
      contrasena: user.contrasena,
      apaterno: user.apaterno,
      amaterno: user.amaterno,
    });
    setShowEditModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditUser = async () => {
    const { nombre, correo, contrasena, apaterno, amaterno } = formData;

    if (selectedUser && contrasena !== selectedUser.contrasena && contrasena.length < 8) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres');
      return;
    }
  
    if (!nombre || !nombre.trim() || !correo || !correo.trim() || !apaterno || !apaterno.trim() || !amaterno || !amaterno.trim()) {
      setErrorMessage('Todos los campos son requeridos y no pueden estar vacíos');
      return;
    }
  
    try {
      await updateUserById(selectedUser.id, nombre, correo, contrasena, apaterno, amaterno);
      const updatedUserList = await getUsers();
      setUsers(updatedUserList);
      setSelectedUser(null);
      setFormData({
        nombre: '',
        correo: '',
        contrasena: '',
        apaterno: '',
        amaterno: '',
      });
      setShowEditModal(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorMessage('Error actualizando el usuario. Por favor, intente nuevamente.');
    }
  };
  
  const handleCloseEditModal = () => {
    setSelectedUser(null);
    setFormData({
      nombre: '',
      correo: '',
      contrasena: '',
      apaterno: '',
      amaterno: '',
    });
    setShowEditModal(false);
    setErrorMessage('');
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowEditModal(true)}>
        Editar Usuario
      </Button>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {selectedUser ? selectedUser.nombre : 'Seleccionar Usuario'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {users.map((user) => (
                <Dropdown.Item key={user.id} onClick={() => handleUserSelect(user)}>
                  {user.nombre}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {selectedUser && (
            <Form>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleFormChange} required/>
              </Form.Group>
              <Form.Group controlId="formCorreo">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" name="correo" value={formData.correo} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group controlId="formContrasena">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="contrasena" value={formData.contrasena} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group controlId="formAPaterno">
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control type="text" name="apaterno" value={formData.apaterno} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group controlId="formAMaterno">
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control type="text" name="amaterno" value={formData.amaterno} onChange={handleFormChange} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEditUser}>
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

export default EditUser;
