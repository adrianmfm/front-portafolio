import React, { useState, useEffect } from 'react';
import { getUsers, deleteUserById } from '../services/api';
import { Table, Button, Modal, Dropdown } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        console.log('Lista de usuarios:', userList);
        setUsers(userList);
      } catch (error) {
        console.error('Error obteniendo usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserById(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setSelectedUser(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedUser(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="mt-4">
      <h1>Lista de Usuarios</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.correo}</td>
              <td>{user.apaterno}</td>
              <td>{user.amaterno}</td>
              <td>
                <Button variant="danger" onClick={() => handleUserSelect(user)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <Button variant="danger" size="sm" onClick={() => handleDeleteUser(selectedUser.id)}>
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
    </div>
  );
};

export default Users;
