import React, { useState, useEffect } from 'react';
import { getUsers, updateUserById, deleteUserById } from '../services/api';
import { Table, Button, Modal, Form, Alert, FormControl } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    apaterno: '',
    amaterno: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosData = await getUsers();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsuarios();
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

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.correo);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(name);
  };

  const handleEditUser = async () => {
    const { nombre, correo, contrasena, apaterno, amaterno } = formData;

    if (selectedUser && contrasena !== selectedUser.contrasena && contrasena.length < 8) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres');
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

    if (nombre.length < 3) {
      setErrorMessage('El nombre es muy corto');
      return;
    }

    if (validateName(apaterno) && apaterno.length < 3) {
      setErrorMessage('El apellido es muy corto');
      return;
    }

    if (amaterno.length < 3) {
      setErrorMessage('El apellido es muy corto');
      return;
    }

    if (!validateEmail()) {
      console.log("Correo no válido:", correo);
      setErrorMessage("El correo no cumple con el formato");
      return;
    }

    if (!nombre.trim() || !correo.trim() || !apaterno.trim() || !amaterno.trim()) {
      setErrorMessage('Todos los campos son requeridos y no pueden estar vacíos');
      return;
    }

    const isCorreoRepetido = usuarios.some(usuario => usuario.id !== selectedUser.id && usuario.correo === correo);
    if (isCorreoRepetido) {
      setErrorMessage("Correo ya existente");
      return;
    }

    try {
      await updateUserById(selectedUser.id, nombre, correo, contrasena, apaterno, amaterno);
      const updatedUserList = await getUsers();
      setUsuarios(updatedUserList);
      setShowEditModal(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Error actualizando el usuario:', error);
      setErrorMessage('Error actualizando el usuario. Por favor, intente nuevamente.');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserById(userId);
      setUsuarios((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error eliminando usuario:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-4">
      <style>
        {`
          @media (max-width: 768px) {
            .mobile-block {
              display: flex;
              padding: 16px;
            }
          }
        `}
      </style>
      <div style={{ textAlign: 'center' }}>
        <h1>Lista de Usuarios</h1>
        <FormControl
          type="text"
          placeholder="Buscar Usuario"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Rol</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map((usuario) => (
              <tr key={usuario.id}>
                 <td>{usuario.idRol === 1 ? 'Administrador' : 'Usuario'}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.apaterno}</td>
                <td>{usuario.amaterno}</td>
                <td className="mobile-block">
                  <Button  variant="warning"  onClick={() => handleUserSelect(usuario)}>
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => { setSelectedUser(usuario); setShowDeleteModal(true); }} style={{ marginLeft: '10px' }}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for editing user */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
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
            <Form.Group controlId="formAPaterno">
              <Form.Label>Apellido Paterno</Form.Label>
              <Form.Control
                type="text"
                name="apaterno"
                value={formData.apaterno}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formAMaterno">
              <Form.Label>Apellido Materno</Form.Label>
              <Form.Control
                type="text"
                name="amaterno"
                value={formData.amaterno}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formCorreo">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formContrasena">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEditUser}>
            Guardar Cambios
          </Button>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for deleting user */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que desea eliminar el usuario {selectedUser?.nombre}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDeleteUser(selectedUser.id)}>
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

export default Users;
